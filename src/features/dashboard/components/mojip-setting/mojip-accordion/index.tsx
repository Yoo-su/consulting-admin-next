'use client';

import { useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Tiptap from '@/shared/components/tiptap-editor';
import { DetailPageData } from '@/features/dashboard/types/detail-page-data.type';

type MojipAccordionProps = {
  detailPageData: DetailPageData;
  selectedRowNum: number | null;
  handleSelectRow: (selectedIdx: number | null) => void;
};
const MojipAccordion = ({ detailPageData, selectedRowNum, handleSelectRow }: MojipAccordionProps) => {
  const [mode, setMode] = useState<'calc' | 'detail'>(detailPageData.mode);
  const [htmlCardtext, setHtmlCardText] = useState<string>(detailPageData.htmlCard);
  const handleChangeValue = useCallback((newHtml: string) => {
    setHtmlCardText(newHtml);
  }, []);

  const handleChangeMode = useCallback((event: SelectChangeEvent) => {
    setMode(event.target.value as 'calc' | 'detail');
  }, []);

  return (
    <Accordion expanded={selectedRowNum === detailPageData.rowNum}>
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
            if (!(selectedRowNum === detailPageData.rowNum)) handleSelectRow(detailPageData.rowNum);
            else handleSelectRow(null);
          }}
        >
          모집요강 {detailPageData.rowNum}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={'column'} spacing={3}>
          <Stack direction={'row'} spacing={2}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Mode</InputLabel>
              <Select value={mode} onChange={handleChangeMode} label="mode">
                <MenuItem value="detail">detail</MenuItem>
                <MenuItem value="calc">calc</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack direction={'column'} spacing={1}>
            <InputLabel>HtmlCard</InputLabel>
            <Tiptap value={htmlCardtext} handleChangeValue={handleChangeValue} />
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default MojipAccordion;
