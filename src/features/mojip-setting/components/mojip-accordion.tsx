'use client';

import { memo, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import ConditionSettingPopover from './condition-setting-popover';
import Tiptap from '@/shared/components/tiptap-editor';
import { DetailPageData } from '../models';
import { useConfirmToast, usePopover } from '@/shared/hooks';
import { useMojipSetting } from '../hooks';

type MojipAccordionProps = {
  serviceID: string;
  detailpageData: DetailPageData;
  isSelected: boolean;
  handleSelectRow: (selectedIdx: number | null) => void;
};
const MojipAccordion = ({ serviceID, detailpageData, isSelected, handleSelectRow }: MojipAccordionProps) => {
  const queryClient = useQueryClient();
  const { openConfirmToast } = useConfirmToast();
  const { updateRowMode, updateRowHtmlCard } = useMojipSetting();
  const conditionPopover = usePopover<HTMLDivElement>();

  const handleChangeValue = useCallback((newHtml: string) => {
    updateRowHtmlCard(detailpageData.rowNum, newHtml);
  }, []);

  /**
   * 상세 페이지 데이터 삭제
   */
  const handleClickDeleteBtn = useCallback(() => {
    openConfirmToast(`${detailpageData.rowNum}번 데이터를 삭제하시겠습니까?`, () => {
      queryClient.setQueryData(['detail-page-data', serviceID], (oldData: DetailPageData[]) => {
        const filteredDetailpageData = oldData.filter((item) => item.rowNum != detailpageData.rowNum);
        return filteredDetailpageData;
      });
      handleSelectRow(null);
    });
  }, [serviceID]);

  return (
    <Accordion expanded={isSelected} sx={{ width: '100%' }}>
      <AccordionSummary>
        <Typography
          variant="h6"
          sx={{
            ':hover': {
              bgcolor: 'rgba(0,0,0,0.03)',
            },
            transition: 'background-color 0.2s ease',
            flexGrow: 1,
            borderRadius: '0.3rem',
            px: 1,
          }}
          onClick={() => {
            if (!isSelected) handleSelectRow(detailpageData.rowNum);
            else handleSelectRow(null);
          }}
        >
          상세 페이지 데이터 {detailpageData.rowNum}
        </Typography>
        {isSelected && (
          <Stack direction={'row'} sx={{ ml: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
            <Chip
              icon={<DeleteIcon />}
              label={<Typography variant="body2">데이터 삭제</Typography>}
              size="small"
              clickable
              onClick={handleClickDeleteBtn}
            />
          </Stack>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={'column'}>
          <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'flex-end'} spacing={2}>
            <Stack direction={'row'} spacing={4} alignItems={'flex-end'}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel sx={{ fontWeight: 'bold' }}>Mode</InputLabel>
                <Select
                  value={detailpageData.mode}
                  onChange={(event) => {
                    updateRowMode(detailpageData.rowNum, event.target.value as 'calc' | 'detail');
                  }}
                  label="mode"
                >
                  <MenuItem value="detail">detail</MenuItem>
                  <MenuItem value="calc">calc</MenuItem>
                </Select>
              </FormControl>
              <Chip
                onClick={conditionPopover.handleOpen}
                ref={conditionPopover.anchorRef}
                clickable
                icon={<TipsAndUpdatesIcon fontSize="medium" color="inherit" />}
                label={<Typography variant="body1">표시조건 설정</Typography>}
                sx={{
                  bgcolor: '#2C4059',
                  color: conditionPopover.open ? '#F5F1B7' : '#FFFDE9',
                }}
              />
              <ConditionSettingPopover
                anchorEl={conditionPopover.anchorRef.current}
                onClose={conditionPopover.handleClose}
                open={conditionPopover.open}
                rowNum={detailpageData.rowNum}
                condition={JSON.parse(detailpageData.condition)}
              />
            </Stack>
          </Stack>
          <Divider sx={{ borderColor: 'rgba(0,0,0,0.06)', mt: 1, mb: 2 }} />

          <Stack direction={'column'} spacing={1}>
            <InputLabel sx={{ fontWeight: 'bold' }}>HTML 카드 편집</InputLabel>
            <Tiptap value={detailpageData.htmlCard} handleChangeValue={handleChangeValue} />
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(MojipAccordion);
