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
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import SaveIcon from '@mui/icons-material/Save';

import Tiptap from '@/shared/components/tiptap-editor';
import { BorderPulseAnimation } from '@/shared/style/mui/keyframes';
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
    <Accordion expanded={selectedRowNum === detailPageData.rowNum} sx={{ width: '100%' }}>
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
          상세 페이지 데이터 {detailPageData.rowNum}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={'column'}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={2}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel sx={{ fontWeight: 'bold' }}>Mode</InputLabel>
              <Select value={mode} onChange={handleChangeMode} label="mode">
                <MenuItem value="detail">detail</MenuItem>
                <MenuItem value="calc">calc</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="text"
              startIcon={<SaveIcon fontSize="inherit" />}
              color="success"
              onClick={() => {
                console.log(htmlCardtext);
              }}
              sx={{
                m: 2,
                height: '35px',
                animation: `${BorderPulseAnimation('#2E7D32')} 3s infinite`,
              }}
            >
              <Typography variant="body1">현재 내용 저장하기</Typography>
            </Button>
          </Stack>
          <Divider sx={{ borderColor: 'rgba(0,0,0,0.06)', mt: 1, mb: 2 }} />

          <Stack direction={'column'} spacing={1}>
            <InputLabel sx={{ fontWeight: 'bold' }}>HTML 카드 편집</InputLabel>
            <Tiptap value={htmlCardtext} handleChangeValue={handleChangeValue} />
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default MojipAccordion;
