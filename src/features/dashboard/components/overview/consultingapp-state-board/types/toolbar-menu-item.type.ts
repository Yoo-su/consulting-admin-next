import { ComponentType } from 'react';
import { BoardType, ViewOption } from '@/features/dashboard/contexts/consultingapp-state-context';

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
