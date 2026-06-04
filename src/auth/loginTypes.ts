import type { User } from '../api/types';

export interface LoginResponse {
  message?: string;
  expiresIn?: number;
  requiresOtp: boolean;
  isNewUser?: boolean;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
}
