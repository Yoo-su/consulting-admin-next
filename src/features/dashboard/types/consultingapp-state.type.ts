export type CurrentState = 'notStarted' | 'dataRequested' | 'developing' | 'testing' | 'deployed' | 'running';
export type ConsultingAppState = {
  univID: string;
  serviceID: string;
  univName: string;
  developer: string;
  developerName: string;
  manager: string | null;
  managerName: string;
  salesPerson?: string;
  salesPersonName?: string;
  serviceYear: string;
  serviceType: 'S_A' | 'J_A'; //'susi' | 'jungsi';
  serialKey?: string;
  isNew?: boolean;
  currentState: CurrentState;
};
