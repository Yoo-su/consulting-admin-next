import { ComponentType } from 'react';

export type ToolbarMenuItem = {
  title: string;
  displayType: BoardType;
  Icon: ComponentType;
};

export type ToolbarViewOption = {
  title: string;
  displayType: ViewOption;
  Icon: ComponentType;
};

export type BoardType = 'mainUser' | 'all';
export type ViewOption = 'basic' | 'separated' | 'table';
export type DialogType = 'create' | 'modify';

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
  serviceType: ServiceType; //'susi' | 'jungsi';
  serialKey?: string;
  isNew?: boolean;
  currentState: CurrentState;
};
export type ServiceType = 'S_A' | 'J_A';

export type StateBoardDomainItem = {
  key: CurrentState;
  title: string;
  color: string;
  bgcolor: string;
};
export type StateBoardDomainItems = {
  [key in CurrentState]: StateBoardDomainItem;
};

export type TableBoardType = Pick<
  Required<ConsultingAppState>,
  'univID' | 'serviceID' | 'developerName' | 'managerName' | 'currentState' | 'isNew'
>;
