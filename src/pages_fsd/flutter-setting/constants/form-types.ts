import { BooleanForm } from '../components/detail-panel-form/boolean-form';
import { ListOrderForm } from '../components/detail-panel-form/list-order-form';
import { MapForm } from '../components/detail-panel-form/map-form';
import { SelectForm } from '../components/detail-panel-form/select-form';
import { TextForm } from '../components/detail-panel-form/text-form';
import { BasicFormComponent, ComponentMappingType, FlutterSettingFormType } from '../models';

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
    component: 'TextForm',
  },
  {
    type: 'double',
    component: 'TextForm',
  },
  {
    type: 'number',
    component: 'TextForm',
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
  TextForm: TextForm as BasicFormComponent,
  MapForm: MapForm as BasicFormComponent,
};
