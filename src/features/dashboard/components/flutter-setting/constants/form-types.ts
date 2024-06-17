import BooleanForm from '../basic-form/boolean-form';
import SelectForm from '../basic-form/select-form';
import ListOrderForm from '../basic-form/list-order-form';
import BasicTextForm from '../basic-form/basic-text-form';
import { ComponentMappingType, FlutterSettingFormType } from '../types/flutter-setting-form.type';

export const FormTypes: FlutterSettingFormType[] = [
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
];

export const ComponentMapping: ComponentMappingType = {
  BooleanForm,
  SelectForm,
  ListOrderForm,
  BasicTextForm,
};
