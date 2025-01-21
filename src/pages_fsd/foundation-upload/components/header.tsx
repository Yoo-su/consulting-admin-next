import { Stack, styled } from '@mui/material';
import { memo } from 'react';

import { LayoutDownloadButton } from './layout-download-button';
import { UploadTypeToggler } from './upload-type-toggler';

export const Header = memo(() => {
  return (
    <HeaderWrapper>
      <UploadTypeToggler />
      <LayoutDownloadButton />
    </HeaderWrapper>
  );
});
Header.displayName = 'FoundationUploadHeader';

const HeaderWrapper = styled(Stack)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  flexGrow: 1,
});
