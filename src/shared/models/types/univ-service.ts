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
