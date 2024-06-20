import BooleanForm from '../basic-form/boolean-form';
import SelectForm from '../basic-form/select-form';
import ListOrderForm from '../basic-form/list-order-form';
import BasicTextForm from '../basic-form/basic-text-form';
import {
  ComponentMappingType,
  FlutterSettingFormType,
  BasicFormComponent,
  EditSettingComponent,
} from '../types/flutter-setting-form.type';
import EditSetting from '../edit-setting';
import MapForm from '../basic-form/map-form';

export const FormTypeList: FlutterSettingFormType[] = [
  {
    type: 'boolean',
    component: 'BooleanForm',
  },
  {
    type: 'select',
    component: 'SelectForm',
  },
  {
    type: 'list-order',
    component: 'ListOrderForm',
  },
  {
    type: 'string',
    component: 'BasicTextForm',
  },
  {
    type: 'double',
    component: 'BasicTextForm',
  },
  {
    type: 'number',
    component: 'BasicTextForm',
  },
  // {
  //   type: 'object',
  //   component: 'EditSetting',
  // },
  {
    type: 'map',
    component: 'MapForm',
  },
];

export const ComponentMapping: ComponentMappingType = {
  // EditSetting: EditSetting as EditSettingComponent,
  BooleanForm: BooleanForm as BasicFormComponent,
  SelectForm: SelectForm as BasicFormComponent,
  ListOrderForm: ListOrderForm as BasicFormComponent,
  BasicTextForm: BasicTextForm as BasicFormComponent,
  MapForm: MapForm as BasicFormComponent,
};
