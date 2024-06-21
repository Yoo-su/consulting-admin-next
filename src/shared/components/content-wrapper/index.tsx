import { ReactNode } from 'react';
import Stack from '@mui/material/Stack';

type ContentWrapperProps = {
  children: ReactNode;
};
const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <Stack
      direction={'column'}
      sx={{
        mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 },
        p: 2,
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        borderRadius: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Stack>
  );
};

export default ContentWrapper;
