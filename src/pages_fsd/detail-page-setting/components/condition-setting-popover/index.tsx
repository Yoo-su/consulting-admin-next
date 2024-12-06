'use client';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Chip from '@mui/material/Chip';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import { EmptyCover } from '@/shared/components';

import { useMojipSetting } from '../../hooks';
import { Condition } from '../../models';
import { ConditionRow } from './condition-row';

type ConditionSettingPopoverProps = {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
  rowNum: number;
  condition: Condition[];
};
export const ConditionSettingPopover = memo(
  ({
    anchorEl,
    onClose,
    open,
    rowNum,
    condition,
  }: ConditionSettingPopoverProps) => {
    const { updateCondition } = useMojipSetting();
    const [currentCondition, setCurrentCondition] =
      useState<Condition[]>(condition);
    const [originalCondition, setOriginalCondition] =
      useState<Condition[]>(condition);

    const hasChanges = useMemo(() => {
      const sortedCurrentCondition = [...currentCondition].sort(
          (a, b) => a.idx - b.idx
        ),
        sortedOriginalCondition = [...originalCondition].sort(
          (a, b) => a.idx - b.idx
        );
      return (
        JSON.stringify(sortedCurrentCondition) !==
        JSON.stringify(sortedOriginalCondition)
      );
    }, [currentCondition, originalCondition]);

    const handleClickSaveBtn = () => {
      updateCondition(rowNum, JSON.stringify(currentCondition));
      setOriginalCondition([...currentCondition]);
      onClose();
    };

    const handleClickAddRowBtn = () => {
      const newIdx = currentCondition.length
        ? Math.max(...Array.from(currentCondition, (item) => item.idx)) + 1
        : 0;
      const newRow: Condition = {
        idx: newIdx,
        logic: currentCondition.length ? 'and' : '',
        dataType: 'MajorNo',
        value: '',
        eqValue: 'EQ',
      };
      setCurrentCondition([...currentCondition, newRow]);
    };

    const handleChangeRowData = (
      idx: number,
      columnType: 'dataType' | 'eqValue' | 'value' | 'logic',
      newData: string | number
    ) => {
      const newCondition = currentCondition.map((item) => {
        if (item.idx !== idx) return item;
        return {
          ...item,
          [columnType]: newData,
        };
      });
      setCurrentCondition(newCondition);
    };

    const handleClickDeleteRowBtn = (idx: number) => {
      if (idx === 0 && currentCondition.length > 1) {
        toast.error(
          <Typography variant="body2">
            연결된 조건이 있어 삭제 불가합니다
          </Typography>
        );
        return;
      }

      const newCondition = [...currentCondition].filter(
        (item) => item.idx !== idx
      );
      setCurrentCondition(newCondition);
    };

    return (
      <StyledPopover
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        onClose={() => {
          setCurrentCondition(originalCondition);
          onClose();
        }}
        open={open}
      >
        <WrapperStack>
          <HeaderStack gap={1}>
            <AddRowChip
              clickable
              onClick={handleClickAddRowBtn}
              icon={<AddCircleIcon color="inherit" />}
              label={
                <Typography variant="button" fontWeight="bold">
                  행추가
                </Typography>
              }
            />
            <SaveRowChip
              clickable
              onClick={handleClickSaveBtn}
              disabled={!hasChanges}
              icon={<ExitToAppIcon color="inherit" />}
              label={
                <Typography variant="button" fontWeight="bold">
                  {hasChanges ? '변경사항 반영' : '변경사항 없음'}
                </Typography>
              }
              color={hasChanges ? 'info' : 'default'}
            />
          </HeaderStack>

          <ConditionContainer>
            {currentCondition.length ? (
              currentCondition.map((item) => (
                <ConditionRow
                  key={item.idx}
                  condition={item}
                  handleChangeRowData={handleChangeRowData}
                  handleClickDeleteRowBtn={handleClickDeleteRowBtn}
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
  boxShadow:
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
}));

const AddRowChip = styled(Chip)(({ theme }) => ({
  backgroundColor: '#597D35',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#597D35',
  },
}));

const SaveRowChip = styled(Chip)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  backgroundColor: '#4863A0',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#4863A0',
  },
  transition: 'all 0.2s ease',
}));

const ConditionContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  position: 'relative',
  padding: theme.spacing(1.25, 0),
  marginTop: theme.spacing(2),
  width: '100%',
  minHeight: '260px',
}));
