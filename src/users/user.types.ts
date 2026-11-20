export type UserRole = 'admin' | 'attendee';

export interface User {
  id: number;
  email: string;
  passwordHash: string;
  roles: UserRole[];
  refreshTokenHash: string | null;
}