import { Stack, Typography } from '@mui/material';
import { MouseEvent } from 'react';
import { URlAddressTextField } from '../copy-text-field';

type AppPWATextFieldProps = {
  title: string;
  url: string;
  id: string;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const AppPWATextField = ({
  title,
  url,
  id,
  handleClick,
}: AppPWATextFieldProps) => {
  return (
    <Stack direction={'column'} spacing={1}>
      <Typography variant="overline">{title}</Typography>
      <URlAddressTextField url={url} id={id} handleClick={handleClick} />
    </Stack>
  );
};
