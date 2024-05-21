export type ConsultingFile = {
  ServiceID: string;
  DownloadURL: string;
  FileVersion?: number | null;
  IsMojip?: boolean | null;
  RefNo: number;
  RefTitle: string;
  FileName: string;
  File: File;
  ServerFilePath: string;
  IsNew?: boolean | null;
};

export type UploadFile = Pick<ConsultingFile, 'ServiceID' | 'RefTitle' | 'FileName' | 'File'>;
