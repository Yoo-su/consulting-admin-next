'use client';

import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { memo } from 'react';

import { EmptyCover } from '@/shared/components';

import { useConditionPopover } from '../../hooks';
import { Condition } from '../../models';
import { AddConditionRowButton } from './add-condition-row-button';
import { ConditionRow } from './condition-row';
import { SaveConditionButton } from './save-condition-button';

type ConditionSettingPopoverProps = {
  anchorEl: Element | null;
  handleClose: () => void;
  open: boolean;
  rowNum: number;
  conditions: Condition[];
};
export const ConditionSettingPopover = memo(
  ({ anchorEl, open, rowNum, conditions, handleClose }: ConditionSettingPopoverProps) => {
    const {
      isConditionChanged,
      currentConditions,
      originalConditions,
      setCurrentConditions,
      handleAddConditionRow,
      handleChangeConditionRow,
      handleSaveConditionChanges,
      handleDeleteConditionRow,
    } = useConditionPopover({
      rowNumber: rowNum,
      conditions: conditions,
    });

    return (
      <StyledPopover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        onClose={() => {
          setCurrentConditions(originalConditions);
          handleClose();
        }}
        open={open}
      >
        <WrapperStack>
          <HeaderStack gap={1}>
            <AddConditionRowButton handleClickAddRow={handleAddConditionRow} />
            <SaveConditionButton handleClickSave={handleSaveConditionChanges} isConditionChanged={isConditionChanged} />
          </HeaderStack>

          <ConditionContainer>
            {currentConditions.length ? (
              currentConditions.map((item) => (
                <ConditionRow
                  key={item.idx}
                  condition={item}
                  handleChangeRowData={handleChangeConditionRow}
                  handleClickDeleteRow={handleDeleteConditionRow}
                />
              ))
            ) : (
              <EmptyCover
                message="등록된 표시조건이 없습니다"
                sx={{
                  borderRadius: '0.5rem',
                  bgcolor: 'rgba(0,0,0,0.02)',
                }}
              />
            )}
          </ConditionContainer>
        </WrapperStack>
      </StyledPopover>
    );
  }
);
ConditionSettingPopover.displayName = 'ConditionSettingPopover';

const StyledPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '540px',
    marginTop: theme.spacing(0.75),
    height: '380px',
  },
}));

const WrapperStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  padding: theme.spacing(2),
  position: 'relative',
  alignItems: 'center',
}));

const HeaderStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  top: theme.spacing(1.25),
  padding: theme.spacing(1, 0.625),
  zIndex: 50,
  backgroundColor: 'rgba(250,249,245,0.85)',
  position: 'sticky',
  width: '100%',
  borderRadius: theme.spacing(0.5),
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
}));

const ConditionContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  position: 'relative',
  padding: theme.spacing(1.25, 0),
  marginTop: theme.spacing(2),
  width: '100%',
  minHeight: '260px',
}));
