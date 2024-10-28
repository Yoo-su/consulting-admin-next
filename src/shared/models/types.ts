import { ComponentType } from 'react';

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

export type Univ = {
  univID: string;
  univName: string;
  univAddress: string;
  longitude: string;
  latitude: string;
  isActive: boolean;
  univEngName: string;
};

export type Service = {
  serviceID: string;
  schoolYear: string;
  isSusi: string;
  univID: string;
  serviceName: string;
  developer: string | null;
  manager: string | null;
  serialNo?: string;
  isNew?: boolean;
};

export type NavItemType = {
  navkey: string;
  title: string;
  href: string;
  Icon: ComponentType;
};

export type NavItemGroup = {
  title: string;
  items: NavItemType[];
  isExpanded?: boolean;
};

export type BrowserItem = {
  name: string;
  path: string;
  size: number;
  lastModified: string;
  isDirectory: boolean;
  contentType?: string;
};
