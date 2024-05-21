import { ComponentType } from 'react';
import { BoardType } from '@/features/dashboard/contexts/consultingapp-state-context';

export type ToolbarMenuItem = {
  title: string;
  displayType: BoardType;
  Icon: ComponentType;
};
