import { createElement, useCallback } from 'react';
import { FlutterRowInfo } from '@/features/dashboard/types/flutter-setting.type';
import { Stack, Typography } from '@mui/material';
import { FlutterSettingFormType, Path } from '../types/flutter-setting-form.type';
import { ComponentMapping, FormTypeList } from '../constants/form-types';
import { useFlutterSetting } from '@/features/dashboard/hooks/context/use-flutter-setting';
import EditSetting from '../edit-setting';
import { getFilteredCustomConfig } from '@/features/dashboard/services/flutter-setting/get-filtered-custom-config';
import { checkChildEdited } from '@/features/dashboard/services/flutter-setting/check-child-edited';

type BasicFormProps = {
  basicKey?: string;
  item: FlutterRowInfo;
  path: Path;
  index?: number;
  isDisabled: boolean;
};

const BasicForm = ({ basicKey, item, path, index = 0, isDisabled }: BasicFormProps) => {
  const { IsRequired, Type, Title, KoreanTitle, Description, level, children } = item;
  const { flutterSettingList, filteredSettingList, setFilteredSettingList, setFlutterSettingList } =
    useFlutterSetting();
  const isEdited = checkChildEdited(item, filteredSettingList, true);

  const handleEdit = (path: (number | string)[], value: string) => {
    const newData = JSON.parse(JSON.stringify(flutterSettingList));
    let current = newData;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]].RowValue = value;
    setFlutterSettingList(newData);
    setFilteredSettingList(getFilteredCustomConfig(newData));
  };

  const createComponent = (formType: FlutterSettingFormType) => {
    const { component } = formType;
    if (ComponentMapping[component] !== undefined) {
      return createElement(ComponentMapping[component] as any, {
        key: `${item.Title}-${index}`,
        item,
        path: path,
        handleEdit: handleEdit,
        isDisabled,
      });
    }
    return null;
  };

  return (
    <Stack key={basicKey} direction={'column'} spacing={subMenuSettings.spacing[level]}>
      <Stack sx={{ paddingTop: subMenuSettings.paddingTop[level] }}>
        <Stack direction={'row'} spacing={1} sx={{ paddingBottom: '1px', backgroundColor: isEdited ? '#EEEEEE' : '' }}>
          <Typography variant={subMenuSettings.variant[level]} sx={{ fontWeight: subMenuSettings.fontWeight[level] }}>
            {Title}
            {IsRequired && '*'}
          </Typography>
          <Typography variant={subMenuSettings.variant[level]} sx={{ color: '#757575' }}>
            {KoreanTitle}
          </Typography>
        </Stack>
        {Type !== 'boolean' && <Typography variant={'caption'}>{Description}</Typography>}
      </Stack>

      {Type === 'object' ? (
        <EditSetting settingList={children} path={path} isDisabled={isDisabled} />
      ) : (
        FormTypeList.filter((form) => form.type === Type).map((el) => createComponent(el))
      )}
    </Stack>
  );
};

export default BasicForm;

const subMenuSettings = {
  spacing: [1, 0, 0],
  variant: ['body1', 'body2', 'body2'] as const,
  fontWeight: ['bolder', 'bold', 'bold'] as const,
  paddingTop: [0, 0, '.5rem'],
};
