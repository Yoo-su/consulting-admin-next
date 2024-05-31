import { ServiceType } from './consultingapp-state.type';

export type ServiceInfo = {
  univID: string;
  univName: string;
  serviceID: string;
  serviceType: ServiceType;
};
