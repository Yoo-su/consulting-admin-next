export type User = {
  sub: string;
  userName: string;
  departmentID: 1 | 2;
  iat: number;
  exp: number;
  profileImage?: string;
  lastAccessDate?: string;
};
