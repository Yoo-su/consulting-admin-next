import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { FormControlLabel, FormGroup, Stack, Switch, Typography } from '@mui/material';
import { FlutterSetting } from '@/features/dashboard/types/flutter-setting.type';
import TreeItemList from '../tree-item-list';

type SettingListProps = {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
  filteredList: FlutterSetting[];
};
const SettingList = ({ toggle, setToggle, filteredList }: SettingListProps) => {
  const handleChange = (event: SyntheticEvent, value: boolean) => {
    setToggle(value);
  };

  return (
    <Stack spacing={2}>
      <Typography variant={'body1'}>카테고리 목록</Typography>
      <FormGroup sx={{ paddingLeft: '1rem' }}>
        <FormControlLabel
          control={<Switch size="small" sx={{ marginRight: '.5rem' }} checked={toggle} onChange={handleChange} />}
          label={toggle ? '예외처리' : '전체보기'}
        />
      </FormGroup>
      <TreeItemList filteredList={filteredList} />
    </Stack>
  );
};

export default SettingList;
