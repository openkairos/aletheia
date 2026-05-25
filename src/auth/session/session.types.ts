export interface AuthenticatedUser {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export interface AccessToken {
  tokenType: 'Bearer';
  expiresIn: number;
  accessToken: string;
}

export interface Session {
  user: AuthenticatedUser;
  token: AccessToken;
}
