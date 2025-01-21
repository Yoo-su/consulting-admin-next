'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  InputLabel,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { memo, useCallback } from 'react';

import { TiptapEditor } from '@/features/tiptap-editor/components';
import { usePopover } from '@/shared/hooks';

import { useHandleDetailPageData } from '../hooks';
import { useDataAccordion } from '../hooks/use-data-accordion';
import { DetailPageData } from '../models';
import { ConditionSettingPopover } from './condition-setting-popover';
import { DeleteDataButton } from './delete-data-button';
import { ModeSelect } from './mode-select';
import { PopoverToggler } from './popover-toggler';

type DetailPageDataAccordionProps = DetailPageData;

export const DetailPageDataAccordion = memo(
  ({ rowNum, condition, mode, htmlCard }: DetailPageDataAccordionProps) => {
    const { isSelected, handleClickTitle } = useDataAccordion(rowNum);
    const { handleDeleteData, handleUpdateHtmlCard, handleUpdateMode } =
      useHandleDetailPageData();
    const { anchorRef, handleOpen, open, handleClose } =
      usePopover<HTMLDivElement>();

    const handleUpdateTiptapValue = useCallback(
      (newValue: string) => {
        handleUpdateHtmlCard(rowNum, newValue);
      },
      [rowNum, handleUpdateHtmlCard]
    );

    return (
      <Accordion expanded={isSelected} sx={{ width: '100%' }}>
        <AccordionSummary>
          <AccordionTitle variant="h6" onClick={handleClickTitle}>
            상세 페이지 데이터 {rowNum}
          </AccordionTitle>
          {isSelected && (
            <Stack
              direction={'row'}
              sx={{ ml: 1, justifyContent: 'flex-end', alignItems: 'center' }}
            >
              <DeleteDataButton
                rowNumber={rowNum}
                handleDeleteData={handleDeleteData}
              />
            </Stack>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction={'column'}>
            <Stack
              direction={'row'}
              justifyContent={'flex-start'}
              alignItems={'flex-end'}
              spacing={2}
            >
              <Stack direction={'row'} spacing={4} alignItems={'flex-end'}>
                <ModeSelect
                  rowNumber={rowNum}
                  currentMode={mode}
                  handleModeChange={handleUpdateMode}
                />
                <PopoverToggler
                  anchorRef={anchorRef}
                  open={open}
                  handleOpen={handleOpen}
                />
                <ConditionSettingPopover
                  anchorEl={anchorRef.current}
                  handleClose={handleClose}
                  open={open}
                  rowNum={rowNum}
                  conditions={JSON.parse(condition)}
                />
              </Stack>
            </Stack>
            <Divider sx={{ borderColor: 'rgba(0,0,0,0.06)', mt: 1, mb: 2 }} />

            <Stack direction={'column'} spacing={1}>
              <InputLabel sx={{ fontWeight: 'bold' }}>
                HTML 카드 편집
              </InputLabel>
              <TiptapEditor
                value={htmlCard}
                handleChangeValue={handleUpdateTiptapValue}
              />
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    );
  }
);
DetailPageDataAccordion.displayName = 'DetailPageDataAccordion';

const AccordionTitle = styled(Typography)({
  ':hover': {
    bgcolor: 'rgba(0,0,0,0.03)',
  },
  transition: 'background-color 0.2s ease',
  flexGrow: 1,
  borderRadius: '0.3rem',
  px: 1,
});
