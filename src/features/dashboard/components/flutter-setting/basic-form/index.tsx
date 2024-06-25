import { FlutterRowInfo } from '@/features/dashboard/types/flutter-setting.type';
import { Stack, Typography } from '@mui/material';
import { createElement } from 'react';
import { FlutterSettingFormType } from '../types/flutter-setting-form.type';
import { ComponentMapping, FormTypeList } from '../constants/form-types';
import EditSetting from '../edit-setting';

type BasicFormProps = {
  basicKey?: string;
  item: FlutterRowInfo;
  subMenu?: boolean;
  isEdit: boolean;
};

const BasicForm = ({ basicKey, item, isEdit }: BasicFormProps) => {
  const { IsRequired, Type, Title, KoreanTitle, Description, level, children } = item;
  const subMenu = level > 0;

  const createComponent = (formType: FlutterSettingFormType, index: number) => {
    const { type, component } = formType;
    // const propType = type === 'object' ? { settingList: children } : { item };
    if (ComponentMapping[component] !== undefined) {
      return createElement(ComponentMapping[component] as any, {
        key: index,
        // ...propType,
        item,
        isEdit,
      });
    }
    return null;
  };

  return (
    <Stack key={basicKey} direction={'column'} spacing={subMenu ? 0 : 1}>
      <Stack sx={{ paddingTop: level > 1 ? '.5rem' : '' }}>
        <Stack direction={'row'} spacing={1} sx={{ paddingBottom: '1px' }}>
          <Typography variant={subMenu ? 'body2' : 'body1'} sx={{ fontWeight: subMenu ? 'bold' : 'bolder' }}>
            {Title}
            {IsRequired && '*'}
          </Typography>
          <Typography variant={subMenu ? 'body2' : 'body1'} sx={{ color: '#757575' }}>
            {KoreanTitle}
          </Typography>
        </Stack>
        {Type !== 'boolean' && <Typography variant={'caption'}>{Description}</Typography>}
      </Stack>

      {Type === 'object' ? (
        <EditSetting settingList={children} isEdit={isEdit} />
      ) : (
        FormTypeList.filter((form) => form.type === Type).map((el, index) => createComponent(el, index))
      )}
    </Stack>
  );
};

export default BasicForm;
