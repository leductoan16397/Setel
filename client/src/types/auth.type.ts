export interface Auth {
  userId: string;
  fullName: string;
  accessToken: string;
  refreshToken: string;
  expires: Date | string;
  email: string;
}
