import { FlutterRowInfo } from '@/features/dashboard/types/flutter-setting.type';
import { EditSettingProps } from '../edit-setting';

export type FormItemProps = {
  item: FlutterRowInfo;
};

export type FlutterSettingFormType = {
  type: 'object' | 'boolean' | 'select' | 'list-order' | 'string' | 'double' | 'map';
  component: string;
};

export type EditSettingComponent = ({ settingList }: EditSettingProps) => JSX.Element;

export type BasicFormComponent = ({ item }: FormItemProps) => JSX.Element;

export type ComponentMappingType = {
  [key: string]: EditSettingComponent | BasicFormComponent;
};
