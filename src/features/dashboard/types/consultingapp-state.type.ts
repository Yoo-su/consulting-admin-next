export type CurrentState = 'notStarted' | 'dataRequested' | 'developing' | 'testing' | 'deployed' | 'running';
export type ConsultingAppState = {
  univID: string;
  serviceID: string;
  univName: string;
  developer: string;
  manager: string;
  salesPerson?: string;
  serviceYear: string;
  serviceType: 'susi' | 'jungsi';
  serialKey?: string;
  isNew?: boolean;
  currentState: CurrentState;
};
