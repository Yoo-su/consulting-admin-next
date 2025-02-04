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

export type ProgressState = 'notStarted' | 'dataRequested' | 'developing' | 'testing' | 'deployed' | 'running';
export type ServiceDetail = {
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
  currentState: ProgressState;
};
export type ServiceType = 'S_A' | 'J_A';

export type ProgressStateColumn = {
  key: ProgressState;
  title: string;
  color: string;
  bgcolor: string;
};
export type ProgressStateColumns = {
  [key in ProgressState]: ProgressStateColumn;
};

export type TableBoardType = Pick<
  Required<ServiceDetail>,
  'univID' | 'serviceID' | 'developerName' | 'managerName' | 'currentState' | 'isNew'
>;
