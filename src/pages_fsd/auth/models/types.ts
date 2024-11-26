export enum AdminGroup {
  Manager = 1,
  Developer = 2,
  ConsultingAdminDeveloper = 3,
}

export type User = {
  sub: string;
  userName: string;
  departmentID: 1 | 2;
  groupIdList: AdminGroup[];
  iat: number;
  exp: number;
  profileImage?: string;
  lastAccessDate?: string;
};
