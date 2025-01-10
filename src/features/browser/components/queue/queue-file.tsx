import { Badge, Box, Stack, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo, useState } from 'react';

import { useHandleHoverState } from '@/shared/hooks';

import { useItemStyle } from '../../hooks';
import { FileIcon } from '../file-icon';

type QueueFileProps = {
  name: string;
  type: string;
  handleRemoveFile: (fileName: string) => void;
};

export const QueueFile = memo(
  ({ name, type, handleRemoveFile }: QueueFileProps) => {
    const { Wrapper, InfoArea } = useItemStyle();
    const { isHovered, setHoverStateFalse, setHoverStateTrue } =
      useHandleHoverState();
    return (
      <Tooltip
        title={`${name} _ 클릭 시 대기열에서 제거됩니다`}
        open={isHovered}
        followCursor
      >
        <Wrapper
          sx={{ animation: 'wiggle 2s infinite' }}
          onMouseEnter={setHoverStateTrue}
          onMouseLeave={setHoverStateFalse}
          onClick={() => {
            handleRemoveFile(name);
          }}
        >
          <StyledBadge
            invisible={!isHovered}
            color={'error'}
            badgeContent={'X'}
          >
            <FileIcon contentType={type ?? ''} />
          </StyledBadge>
          <InfoArea>
            <Typography className={'item-name'} variant={'caption'}>
              {name}
            </Typography>
          </InfoArea>
        </Wrapper>
      </Tooltip>
    );
  }
);
QueueFile.displayName = 'QueueFile';

const StyledBadge = styled(Badge)(() => ({
  cursor: 'pointer',
  '& .browser-item-wrapper': {
    width: '100%',
  },
}));
