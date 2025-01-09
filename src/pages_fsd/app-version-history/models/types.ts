import { OsType } from '../constants';

export type OsTypeValues = (typeof OsType)[keyof typeof OsType];

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
