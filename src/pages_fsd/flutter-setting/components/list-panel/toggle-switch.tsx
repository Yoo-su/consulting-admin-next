import { Stack, Switch, Typography } from '@mui/material';
import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { SwitchClass } from '../../constants/classes';

type ToggleSwitchProps = {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
};

export const ToggleSwitch = ({ toggle, setToggle }: ToggleSwitchProps) => {
  const handleChange = (event: SyntheticEvent, value: boolean) => {
    setToggle(value);
  };

  return (
    <Stack direction={'row'} alignItems={'center'}>
      <Typography variant="body2" sx={{ color: toggle ? '#969696' : 'black' }}>
        전체
      </Typography>
      <Switch
        size="small"
        sx={SwitchClass}
        checked={toggle}
        onChange={handleChange}
      />
      <Typography variant="body2" sx={{ color: toggle ? 'black' : '#969696' }}>
        예외
      </Typography>
    </Stack>
  );
};
