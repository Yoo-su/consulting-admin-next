import { Service } from '@/shared/models';

export type ServiceOption = Pick<Service, 'isSusi' | 'schoolYear' | 'serviceID' | 'serviceName'> & {
  serviceYear: string;
};
