export interface Auth {
  isAuthenticated: boolean;
  authenticate: () => void;
  logout: () => void;
}

export type UseAuth = () => Auth;
