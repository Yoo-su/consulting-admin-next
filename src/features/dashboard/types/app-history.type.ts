export type AppHistory = {
  ServiceID: string;
  OsType: 'A' | 'P';
  Version: number;
  PackageFileName: string | null;
  ProvisionFileName: string | null;
  ReleaseNote: string | null;
  UploadTime: string;
  ManualFileName: string | null;
};
