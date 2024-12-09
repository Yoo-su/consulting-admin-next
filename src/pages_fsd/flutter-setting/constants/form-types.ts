import { BasicTextForm } from '../components/basic-form/basic-text-form';
import { BooleanForm } from '../components/basic-form/boolean-form';
import { ListOrderForm } from '../components/basic-form/list-order-form';
import { MapForm } from '../components/basic-form/map-form';
import { SelectForm } from '../components/basic-form/select-form';
import {
  BasicFormComponent,
  ComponentMappingType,
  FlutterSettingFormType,
} from '../models';

export const FORM_TYPE_LIST: FlutterSettingFormType[] = [
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

export const COMPONENT_MAPPING: ComponentMappingType = {
  // EditSetting: EditSetting as EditSettingComponent,
  BooleanForm: BooleanForm as BasicFormComponent,
  SelectForm: SelectForm as BasicFormComponent,
  ListOrderForm: ListOrderForm as BasicFormComponent,
  BasicTextForm: BasicTextForm as BasicFormComponent,
  MapForm: MapForm as BasicFormComponent,
};
