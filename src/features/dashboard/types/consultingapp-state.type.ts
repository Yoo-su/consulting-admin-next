export type CurrentState = 'notStarted' | 'dataRequested' | 'developing' | 'testing' | 'deployed' | 'running';
export type ConsultingAppState = {
  univID: string;
  serviceID: string;
  univName: string;
  developer: string;
  manager: string;
  serviceYear: string;
  serviceType: 'susi' | 'jungsi';
  salesPerson?: string;
  serialKey?: string;
  isNew?: boolean;
  currentState: CurrentState;
};
