import { Service } from '@/shared/models';

import { EditSettingProps } from '../components/detail-panel/edit-setting';
import { KEYBOARD_KEY, PRE_COLORS } from '../constants';

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

export type ArrowColorSpace = {
  [key in (typeof KEYBOARD_KEY)[keyof typeof KEYBOARD_KEY]]: {
    type: 'hsvS' | 'hsvV';
    value: 1 | -1;
  };
};

export type HSV = { h: number; s: number; v: number };
export type RGB = { r: number; g: number; b: number };

export type FlutterSetting = FlutterCategory & {
  children: FlutterRowInfo[];
};

export type FlutterCategory = {
  CategoryIdx: number;
  Category: string;
  Description: string;
  Index?: number;
};
export type FlutterRowInfo = {
  Category: string;
  RowIdx: number;
  Title: string;
  KoreanTitle: string;
  Type: string;
  Description: string;
  IsRequired: boolean;
  ParentIdx: null | number;
  DefaultValue: string;
  children: FlutterRowInfo[];
  level: number;
  transferDefaultValue: unknown;
  RowValue?: string;
  Index?: number;
  OriginalRowValue?: string;
};

export type GetCategoryInfoList = FlutterSetting | FlutterRowInfo | (FlutterSetting | FlutterRowInfo)[];

export type ServiceOption = Pick<Service, 'isSusi' | 'schoolYear' | 'serviceID' | 'serviceName'> & {
  serviceYear: string;
};

export type MapObject = {
  item: string;
  value: string;
};

export type PreColors = (typeof PRE_COLORS)[number];
