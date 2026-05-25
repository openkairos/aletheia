import type { LoginCredentials, LoginResult } from '@/auth/login/login.types.ts';

const LOGIN_PATH = '/api/v1/login';
const UNEXPECTED_LOGIN_RESPONSE = 'Unexpected login response.';
const LOGIN_NETWORK_ERROR = 'Unable to reach the login service.';

interface LoginRequestDependencies {
  fetch: typeof fetch;
  apiBasePath: string;
}

interface LoginSuccessResponse {
  data: {
    user: {
      id: string;
      username: string;
      email: string;
      roles: string[];
    };
    token: {
      token_type: 'Bearer';
      expires_in: number;
      access_token: string;
    };
  };
}

interface ValidationErrorResponse {
  errors: Partial<Record<keyof LoginCredentials, string[]>>;
}

interface AuthenticationErrorResponse {
  type: 'INVALID_CREDENTIALS';
  message: string;
}

const unexpectedError = (): LoginResult => ({
  type: 'unexpected-error',
  message: UNEXPECTED_LOGIN_RESPONSE,
});

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(item => typeof item === 'string');

const isLoginSuccessResponse = (value: unknown): value is LoginSuccessResponse => {
  if (!isRecord(value) || !isRecord(value.data) || !isRecord(value.data.user) || !isRecord(value.data.token)) {
    return false;
  }

  const { user, token } = value.data;

  return (
    typeof user.id === 'string' &&
    typeof user.username === 'string' &&
    typeof user.email === 'string' &&
    isStringArray(user.roles) &&
    token.token_type === 'Bearer' &&
    typeof token.expires_in === 'number' &&
    typeof token.access_token === 'string'
  );
};

const isValidationErrorResponse = (value: unknown): value is ValidationErrorResponse => {
  if (!isRecord(value) || !isRecord(value.errors)) return false;

  return Object.values(value.errors).every(isStringArray);
};

const isAuthenticationErrorResponse = (value: unknown): value is AuthenticationErrorResponse => {
  return isRecord(value) && value.type === 'INVALID_CREDENTIALS' && typeof value.message === 'string';
};

const mapSuccessResponse = (response: LoginSuccessResponse): LoginResult => ({
  type: 'success',
  user: {
    id: response.data.user.id,
    username: response.data.user.username,
    email: response.data.user.email,
    roles: response.data.user.roles,
  },
  token: {
    tokenType: response.data.token.token_type,
    expiresIn: response.data.token.expires_in,
    accessToken: response.data.token.access_token,
  },
});

const mapLoginResponse = (status: number, body: unknown): LoginResult => {
  if (status === 200) {
    return isLoginSuccessResponse(body) ? mapSuccessResponse(body) : unexpectedError();
  }

  if (status === 400) {
    return isValidationErrorResponse(body) ? { type: 'validation-error', errors: body.errors } : unexpectedError();
  }

  if (status === 401) {
    return isAuthenticationErrorResponse(body)
      ? { type: 'authentication-error', code: body.type, message: body.message }
      : unexpectedError();
  }

  return unexpectedError();
};

export const createLoginRequest =
  ({ fetch, apiBasePath }: LoginRequestDependencies) =>
  async (credentials: LoginCredentials): Promise<LoginResult> => {
    let response: Response;

    try {
      response = await fetch(`${apiBasePath}${LOGIN_PATH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(credentials),
      });
    } catch {
      return { type: 'network-error', message: LOGIN_NETWORK_ERROR };
    }

    try {
      return mapLoginResponse(response.status, await response.json());
    } catch {
      return unexpectedError();
    }
  };
