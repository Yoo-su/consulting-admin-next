import { FlutterRowInfo } from '@/features/dashboard/types/flutter-setting.type';
import { EditSettingProps } from '../edit-setting';

export type Path = (number | string)[];
export type FormItemProps = {
  item: FlutterRowInfo;
  path: Path;
  handleEdit: (path: Path, value: string) => void;
  isDisabled: boolean;
};

export type FlutterSettingFormType = {
  type: 'object' | 'boolean' | 'select' | 'list-order' | 'string' | 'double' | 'map' | 'number';
  component: string;
};

export type EditSettingComponent = ({ settingList }: EditSettingProps) => JSX.Element;

export type BasicFormComponent = ({ item }: FormItemProps) => JSX.Element;

export type ComponentMappingType = {
  [key: string]: EditSettingComponent | BasicFormComponent;
};
