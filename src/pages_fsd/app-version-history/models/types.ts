import { OS_TYPE } from '../constants';

export type OsTypeValues = (typeof OS_TYPE)[keyof typeof OS_TYPE];

export type AppHistory = {
  serviceID: string;
  osType: Exclude<OsTypeValues, 'O'>;
  version: number;
  packageFileName: string | null;
  provisionFileName: string | null;
  releaseNote: string | null;
  uploadTime: string;
  manualFileName: string | null;
};

export type ConsultingAppType = OsTypeValues;
