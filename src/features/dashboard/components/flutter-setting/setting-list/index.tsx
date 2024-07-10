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
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ padding: '.5rem .8rem ' }}>
        <Typography variant={'body1'}>카테고리 목록</Typography>
        <Stack direction={'row'} alignItems={'center'}>
          <Typography variant="body2" sx={{ color: toggle ? '#969696' : 'black' }}>
            전체
          </Typography>
          <Switch size="small" sx={{ marginRight: '2px', ...SwitchClass }} checked={toggle} onChange={handleChange} />
          <Typography variant="body2" sx={{ color: toggle ? 'black' : '#969696' }}>
            예외
          </Typography>
        </Stack>
      </Stack>
      <TreeItemList filteredList={filteredList} />
    </Stack>
  );
};

export default SettingList;

const SwitchClass = {
  '& .Mui-checked': {
    color: '#fff',
  },
  '& .Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#000',
  },
};
