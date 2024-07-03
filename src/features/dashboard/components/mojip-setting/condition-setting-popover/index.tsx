'use client';

import { useMemo, useState } from 'react';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useMojipSetting } from '@/features/dashboard/hooks/context/use-mojip-setting';
import { Condition } from '../types/condition.type';
import ConditionRow from './condition-row';
import toast from 'react-hot-toast';
import EmptyConditionBox from './empty-condition-box';

type ConditionSettingPopoverProps = {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
  rowNum: number;
  condition: Condition[];
};
const ConditionSettingPopover = ({ anchorEl, onClose, open, rowNum, condition }: ConditionSettingPopoverProps) => {
  const { updateCondition } = useMojipSetting();
  const [currentCondition, setCurrentCondition] = useState<Condition[]>(condition);
  const [originalCondition, setOriginalCondition] = useState<Condition[]>(condition);

  const hasChanges = useMemo(() => {
    const sortedCurrentCondition = [...currentCondition].sort((a, b) => a.idx - b.idx),
      sortedOriginalCondition = [...originalCondition].sort((a, b) => a.idx - b.idx);
    return JSON.stringify(sortedCurrentCondition) !== JSON.stringify(sortedOriginalCondition);
  }, [currentCondition, originalCondition]);

  const handleClickSaveBtn = () => {
    updateCondition(rowNum, JSON.stringify(currentCondition));
    setOriginalCondition([...currentCondition]);
    onClose();
  };

  const handleClickAddRowBtn = () => {
    const newIdx = currentCondition.length ? Math.max(...Array.from(currentCondition, (item) => item.idx)) + 1 : 0;
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
      toast.error(<Typography variant="body1">연결된 조건이 있어 삭제 불가합니다</Typography>);
      return;
    }

    const newCondition = [...currentCondition].filter((item) => item.idx !== idx);
    setCurrentCondition(newCondition);
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={() => {
        setCurrentCondition(originalCondition);
        onClose();
      }}
      open={open}
      slotProps={{ paper: { sx: { width: '540px', mt: 0.6, height: '380px' } } }}
      sx={{ overflowY: 'scroll' }}
    >
      <Stack direction={'column'} sx={{ p: '16px 20px', position: 'relative', alignItems: 'center' }}>
        <Stack
          direction={'row'}
          justifyContent={'flex-end'}
          spacing={1}
          sx={{
            top: 10,
            padding: '0.8rem 0.5rem',
            zIndex: 50,
            bgcolor: 'rgba(250,249,245,0.85)',
            position: 'sticky',
            width: '100%',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }}
        >
          <Chip
            clickable
            onClick={handleClickAddRowBtn}
            icon={<AddCircleIcon color="inherit" />}
            label={
              <Typography variant="button" fontWeight={'bold'}>
                행추가
              </Typography>
            }
            sx={{
              bgcolor: '#597D35',
              '&:hover': {
                bgcolor: '#597D35',
              },
              color: '#fff',
            }}
          />
          <Chip
            clickable
            onClick={handleClickSaveBtn}
            disabled={!hasChanges}
            icon={<ExitToAppIcon />}
            label={
              <Typography variant="button" fontWeight={'bold'}>
                {hasChanges ? '변경사항 반영' : '변경사항 없음'}
              </Typography>
            }
            color={hasChanges ? 'info' : 'default'}
            sx={{ px: 1 }}
          />
        </Stack>

        {currentCondition.length ? (
          <Stack direction={'column'} spacing={0} sx={{ p: '10px 0', mt: 2, width: '100%', height: '100%' }}>
            {currentCondition.map((item) => (
              <ConditionRow
                key={item.idx}
                condition={item}
                handleChangeRowData={handleChangeRowData}
                handleClickDeleteRowBtn={handleClickDeleteRowBtn}
              />
            ))}
          </Stack>
        ) : (
          <EmptyConditionBox />
        )}
      </Stack>
    </Popover>
  );
};

export default ConditionSettingPopover;
