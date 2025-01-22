import BuildIcon from '@mui/icons-material/Build';
import { Badge, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo, useCallback, useState } from 'react';

import {
  useHandleHoverState,
  useOutsideClick,
  usePopover,
} from '@/shared/hooks';
import { formatKoreanTextCompareDatesFromNow } from '@/shared/services';

import { useItemStyle } from '../../hooks';
import { BrowserItem } from '../../models';
import { FileIcon } from '../file-icon';
import { GridItemWrapper } from '../grid-item-wrapper';
import { FileNameInput } from './file-name-input';
import { FilePopover } from './file-popover';

type BrowserFileProps = BrowserItem;
export const BrowserFile = memo(
  ({ name, path, lastModified, contentType }: BrowserFileProps) => {
    const filePopover = usePopover();
    const [originalFilename = '', extension = ''] = name.split(/\.(?=[^.]*$)/);
    const { isHovered, setHoverStateTrue, setHoverStateFalse } =
      useHandleHoverState();
    const { Wrapper, InfoArea, isBasic } = useItemStyle();
    const [isEditMode, setIsEditMode] = useState(false);

    const handleClosePopover = useCallback(() => {
      filePopover.handleClose();
      setHoverStateFalse();
    }, []);
    const wrapperRef = useOutsideClick(() => setIsEditMode(false));

    return (
      <GridItemWrapper isBasic={isBasic}>
        <Tooltip title={originalFilename} open={isHovered} followCursor>
          <Wrapper
            className={'browser-item-wrapper'}
            ref={wrapperRef}
            onMouseEnter={setHoverStateTrue}
            onMouseLeave={setHoverStateFalse}
            onClick={filePopover.handleOpen}
          >
            <StyledBadge
              invisible={!isHovered && !filePopover.open}
              color={'default'}
              badgeContent={<BuildIcon color={'action'} fontSize={'medium'} />}
              ref={filePopover.anchorRef}
            >
              <FileIcon contentType={contentType ?? ''} />
            </StyledBadge>
            <InfoArea>
              {isEditMode ? (
                <FileNameInput
                  path={path}
                  extension={extension}
                  originalFileName={originalFilename}
                />
              ) : (
                <Typography className={'item-name'} variant={'caption'}>
                  {originalFilename}
                </Typography>
              )}

              {!isBasic && (
                <StyledModifiedDate variant={'caption'}>
                  {formatKoreanTextCompareDatesFromNow(lastModified)}
                </StyledModifiedDate>
              )}
            </InfoArea>
          </Wrapper>
        </Tooltip>

        <FilePopover
          path={path}
          name={name}
          open={filePopover.open}
          anchorEl={filePopover.anchorRef.current}
          handleSetIsEditMode={setIsEditMode}
          onClose={handleClosePopover}
        />
      </GridItemWrapper>
    );
  }
);
BrowserFile.displayName = 'BrowserFile';

const StyledBadge = styled(Badge)(() => ({
  cursor: 'pointer',
  '& .browser-item-wrapper': {
    width: '100%',
  },
}));

const StyledModifiedDate = styled(Typography)({
  color: '#cccdc6',
});
