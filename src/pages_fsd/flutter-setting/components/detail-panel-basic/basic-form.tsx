import { Stack } from '@mui/material';

import { SUB_MENU_SETTING } from '../../constants';
import { useFlutterSetting } from '../../hooks';
import { FlutterRowInfo, Path } from '../../models';
import { getFilteredCustomConfig, getSubMenuClass } from '../../services';
import { EditSetting } from '../detail-panel';
import { BasicFormTitle } from './basic-form-title';
import { BasicFormTypeList } from './basic-form-type-list';

type BasicFormProps = {
  basicKey?: string;
  item: FlutterRowInfo;
  path: Path;
  index?: number;
  isDisabled: boolean;
};

export const BasicForm = ({
  basicKey,
  item,
  path,
  index = 0,
  isDisabled,
}: BasicFormProps) => {
  const { Type, level, children } = item;
  const {
    flutterSettingList,
    filteredSettingList,
    setFilteredSettingList,
    setFlutterSettingList,
  } = useFlutterSetting();

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

  const componentObj = {
    key: `${item.Title}-${index}`,
    item,
    path: path,
    handleEdit: handleEdit,
    isDisabled,
  };

  return (
    <Stack
      key={basicKey}
      direction={'column'}
      spacing={SUB_MENU_SETTING.spacing[level]}
      sx={getSubMenuClass(level, ['paddingLeft'])}
    >
      <BasicFormTitle item={item} filteredSettingList={filteredSettingList} />

      {Type === 'object' ? (
        <EditSetting
          settingList={children}
          path={path}
          isDisabled={isDisabled}
        />
      ) : (
        <BasicFormTypeList componentObj={componentObj} Type={Type} />
      )}
    </Stack>
  );
};
