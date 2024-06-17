import { FlutterRowInfo } from '@/features/dashboard/types/flutter-setting.type';
import { Stack, Typography } from '@mui/material';
import EditSetting from '../edit-setting';
import React from 'react';
import { FlutterSettingFormType } from '../types/flutter-setting-form.type';
import { ComponentMapping, FormTypes } from '../constants/form-types';

type BasicFormProps = {
  basicKey?: string;
  item: FlutterRowInfo;
  subMenu?: boolean;
};

const BasicForm = ({ basicKey, item }: BasicFormProps) => {
  const { Type, Title, KoreanTitle, Description, level, children } = item;
  const subMenu = level > 0;

  const createComponent = (formType: FlutterSettingFormType, index: number) => {
    const { component } = formType;
    return React.createElement(ComponentMapping[component], { key: index, item });
  };

  return (
    <Stack key={basicKey} direction={'column'} spacing={subMenu ? 0 : 1}>
      <Stack sx={{ paddingTop: level > 1 ? '.5rem' : '' }}>
        <Stack direction={'row'} spacing={1} sx={{ paddingBottom: '1px' }}>
          <Typography variant={subMenu ? 'body2' : 'body1'} sx={{ fontWeight: subMenu ? 'bold' : 'bolder' }}>
            {Title}
          </Typography>
          <Typography variant={subMenu ? 'body2' : 'body1'} sx={{ color: '#757575' }}>
            {KoreanTitle}
          </Typography>
        </Stack>
        {Type !== 'boolean' && <Typography variant={'caption'}>{Description}</Typography>}
      </Stack>
      {Type === 'object' ? (
        <EditSetting settingList={children} />
      ) : (
        FormTypes.filter((form) => form.type === Type).map((el, index) => createComponent(el, index))
      )}
    </Stack>
  );
};

export default BasicForm;
