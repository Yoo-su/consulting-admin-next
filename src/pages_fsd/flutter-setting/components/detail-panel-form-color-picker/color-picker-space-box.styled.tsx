import styled from '@emotion/styled';
import { Box } from '@mui/material';

import { BG_IMAGE_SPACE } from '../../constants';

export const SpaceBox = styled(Box)({
  width: '100%',
  height: '180px',
  boxSizing: 'border-box',
  outline: 0,
  position: 'relative',
  backgroundImage: BG_IMAGE_SPACE,
});
