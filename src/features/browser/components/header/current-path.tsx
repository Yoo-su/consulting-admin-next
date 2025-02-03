import { Stack, styled, Typography } from '@mui/material';
import { memo } from 'react';

type CurrentPathProps = {
  displayingPath: string;
};
export const CurrentPath = memo(({ displayingPath }: CurrentPathProps) => {
  return (
    <CurrentPathBox direction="row">
      <Typography variant="caption" color="grey.700">
        현재경로: <b>{displayingPath}</b>
      </Typography>
    </CurrentPathBox>
  );
});
CurrentPath.displayName = 'CurrentPath';

const CurrentPathBox = styled(Stack)({
  bgcolor: '#fff',
  width: 'fit-content',
  borderRadius: '0.3rem',
  padding: '0.3rem',
  transition: 'width 0.2s linear',
  border: '1px solid #B6BBBF',
  alignItems: 'center',
});
