export type AppHistory = {
  serviceID: string;
  osType: 'A' | 'P';
  version: number;
  packageFileName: string | null;
  provisionFileName: string | null;
  releaseNote: string | null;
  uploadTime: string;
  manualFileName: string | null;
};

export type ConsultingAppType = 'O' | 'A' | 'P';
