import { useState, useEffect, ChangeEvent, Fragment } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useChartSetting } from '@/features/dashboard/hooks/context/use-chart-setting';
import { ChartData } from '@/features/dashboard/types/chart-data.type';

type ModelLevelTableProps = {
  chartData: ChartData[];
  modelNum: number;
  level: number;
};
const ModelLevelTable = ({ chartData, modelNum, level }: ModelLevelTableProps) => {
  const { shiftModelRows, addNewModelLevelRow } = useChartSetting();
  const [tmpChartData, setTmpChartData] = useState<ChartData[]>(chartData);
  const [editMode, setEditMode] = useState<boolean>(false);

  const enterEditMode = () => {
    setEditMode(true);
  };
  const saveEditContent = () => {
    shiftModelRows(tmpChartData, modelNum, level);
    setEditMode(false);
  };
  const cancleEdit = () => {
    setEditMode(false);
  };

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = event.target;
    setTmpChartData((prevData) => prevData.map((item, i) => (i === index ? { ...item, [name]: value } : item)));
  };

  useEffect(() => {
    setTmpChartData(chartData);
  }, [chartData]);

  return (
    <Stack sx={{ my: 2 }}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Stack direction={'row'} spacing={1} alignItems="center">
          <Typography variant="caption">{`단계 ${chartData[0].level}`}</Typography>
        </Stack>
        {editMode ? (
          <Stack direction={'row'} spacing={0.5}>
            <Button size="small" color="success" variant="outlined" onClick={saveEditContent}>
              <Typography variant="body1" fontSize={12}>
                완료
              </Typography>
            </Button>
            <Button size="small" color="inherit" variant="outlined" onClick={cancleEdit}>
              <Typography variant="body1" fontSize={12}>
                취소
              </Typography>
            </Button>
          </Stack>
        ) : (
          <Button size="small" variant="outlined" color="primary" onClick={enterEditMode}>
            <Typography variant="body1" fontSize={12}>
              편집모드
            </Typography>
          </Button>
        )}
      </Stack>
      <TableContainer component={Paper} sx={{ mt: 0.1 }}>
        <Table size="small" aria-label="model-level-table">
          <TableHead>
            <TableRow>
              <TableCell>label</TableCell>
              <TableCell align="right">차트 label</TableCell>
              <TableCell align="right">비율(%)</TableCell>
              <TableCell align="right">삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chartData.map((data, idx) => (
              <TableRow key={idx} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {editMode ? (
                    <TextField
                      name="label"
                      defaultValue={data.label}
                      size="small"
                      variant="standard"
                      onChange={(e) => handleFieldChange(e, idx)}
                    />
                  ) : (
                    data.label
                  )}
                </TableCell>
                <TableCell align="right">
                  {editMode ? (
                    <TextField
                      defaultValue={data.chartLabel}
                      size="small"
                      variant="standard"
                      name="chartLabel"
                      onChange={(e) => handleFieldChange(e, idx)}
                    />
                  ) : (
                    data.chartLabel
                  )}
                </TableCell>
                <TableCell align="right">
                  {editMode ? (
                    <TextField
                      name="percentage"
                      type="number"
                      defaultValue={data.percentage}
                      size="small"
                      variant="standard"
                      onChange={(e) => handleFieldChange(e, idx)}
                    />
                  ) : (
                    data.percentage
                  )}
                </TableCell>
                <TableCell align="right">
                  <Stack>🗑️</Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {editMode && (
            <TableFooter>
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  <Box
                    sx={{
                      cursor: 'pointer',
                      ':hover': {
                        bgcolor: '#E3F2FD',
                      },
                      transition: 'all 0.2s linear',
                      borderRadius: '0.5rem',
                    }}
                    onClick={() => {
                      addNewModelLevelRow(modelNum, level);
                    }}
                  >
                    <AddCircleIcon sx={{ mt: 1 }} />
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default ModelLevelTable;
