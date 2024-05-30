import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ChartData } from '@/features/dashboard/types/chart-data.type';

type ModelLevelTableProps = {
  chartData: ChartData[];
};
const ModelLevelTable = ({ chartData }: ModelLevelTableProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const enterEditMode = () => {
    setEditMode(true);
  };
  const saveEditContent = () => {
    setEditMode(false);
  };
  const cancleEdit = () => {
    setEditMode(false);
  };

  return (
    <Stack sx={{ my: 2 }}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="caption">{`단계 ${chartData[0].level}`}</Typography>
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
                  {data.label}
                </TableCell>
                <TableCell align="right">{data.chartLabel}</TableCell>
                <TableCell align="right">{data.percentage}</TableCell>
                <TableCell align="right">🗑️</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default ModelLevelTable;
