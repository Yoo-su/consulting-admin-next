export type User = {
  userID: string;
  name: string;
  role: 'developer' | 'manager';
  token?: string;
};
