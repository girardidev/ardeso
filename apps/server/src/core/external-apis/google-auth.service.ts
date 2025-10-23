export interface GoogleUserInfo {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
}

export interface GoogleAuthService {
  getAuthUrl(redirectUri: string): string;
  verifyToken(code: string, redirectUri: string): Promise<GoogleUserInfo>;
}
