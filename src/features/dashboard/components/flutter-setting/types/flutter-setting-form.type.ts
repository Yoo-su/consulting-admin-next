import { FlutterRowInfo } from '@/features/dashboard/types/flutter-setting.type';

export type FormItemProps = {
  item: FlutterRowInfo;
};

export type FlutterSettingFormType = {
  type: 'object' | 'boolean' | 'select' | 'list-order' | 'string';
  component: string;
};

export type ComponentMappingType = {
  [key: string]: ({ item }: FormItemProps) => JSX.Element;
};
