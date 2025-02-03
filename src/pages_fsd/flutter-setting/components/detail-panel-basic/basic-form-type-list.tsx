import { createElement } from 'react';

import { COMPONENT_MAPPING, FORM_TYPE_LIST } from '../../constants';
import { FlutterRowInfo, FlutterSettingFormType, Path } from '../../models';

type BasicFormTypeListProps = {
  componentObj: {
    key: string;
    item: FlutterRowInfo;
    path: Path;
    handleEdit: (path: (number | string)[], value: string) => void;
    isDisabled: boolean;
  };
  Type: string;
};

export const BasicFormTypeList = ({ componentObj, Type }: BasicFormTypeListProps) => {
  const createComponent = (formType: FlutterSettingFormType) => {
    const { component } = formType;
    if (COMPONENT_MAPPING[component] !== undefined) {
      return createElement(COMPONENT_MAPPING[component] as any, componentObj);
    }
    return null;
  };
  return <>{FORM_TYPE_LIST.filter((form) => form.type === Type).map((el) => createComponent(el))}</>;
};
