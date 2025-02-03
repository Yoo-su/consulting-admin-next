import { Stack, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import { FlutterSetting } from '../../models';
import { TreeItemList } from '../list-panel-tree/';
import { ToggleSwitch } from './toggle-switch';

type SettingListProps = {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  filteredList: FlutterSetting[];
};
export const SettingList = ({ toggle, setToggle, filteredList }: SettingListProps) => {
  return (
    <Stack spacing={2}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ padding: '.5rem .8rem ' }}>
        <Typography variant={'body1'}>카테고리 목록</Typography>
        <ToggleSwitch toggle={toggle} setToggle={setToggle} />
      </Stack>
      <TreeItemList filteredList={filteredList} />
    </Stack>
  );
};
