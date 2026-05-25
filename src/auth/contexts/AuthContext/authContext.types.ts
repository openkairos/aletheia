export interface Auth {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export type AuthContext = () => Auth;
