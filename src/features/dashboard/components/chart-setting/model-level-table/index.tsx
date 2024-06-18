import { useState, useEffect, ChangeEvent, memo } from 'react';
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

import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import { useChartSetting } from '@/features/dashboard/hooks/context/use-chart-setting';
import { ChartData } from '@/features/dashboard/types/chart-data.type';
import { useConfirmToast } from '@/shared/hooks/use-confirm-toast';
import toast from 'react-hot-toast';

type ModelLevelTableProps = {
  chartData: ChartData[];
  modelNum: number;
  level: number;
  isEditing: boolean;
  toggleIsEditing: any;
};
const ModelLevelTable = ({ chartData, modelNum, level, isEditing, toggleIsEditing }: ModelLevelTableProps) => {
  const { currentService } = useUnivService();
  const { shiftModelRows, deleteModelLevel } = useChartSetting();
  const [tmpChartData, setTmpChartData] = useState<ChartData[]>(chartData);
  const { openConfirmToast } = useConfirmToast();
  const [editMode, setEditMode] = useState<boolean>(false);

  // 편집 모드에 진입합니다
  const enterEditMode = () => {
    if (!isEditing) {
      toggleIsEditing();
      setEditMode(true);
    } else {
      toast.error('이미 다른 테이블이 편집중입니다');
      return;
    }
  };
  // 편집 내용을 저장하고 편집모드를 종료합니다
  const saveEditContent = () => {
    const labelsSet = new Set();

    for (const item of tmpChartData) {
      if (labelsSet.has(item.label)) {
        toast.error(<Typography variant="body2">[{item.label}] label이 중복되었습니다</Typography>);
        return;
      }
      labelsSet.add(item.label);
    }
    if (JSON.stringify(chartData) !== JSON.stringify(tmpChartData)) shiftModelRows(tmpChartData, modelNum, level);
    toggleIsEditing();
    setEditMode(false);
  };
  // 편집 내용을 취소하고 편집모드를 종료합니다
  const cancleEdit = () => {
    setTmpChartData(chartData);
    toggleIsEditing();
    setEditMode(false);
  };

  /**
   * 특정 모델의 특정 단계에 새로운 행을 추가합니다
   * @param modelNum
   * @param level
   */
  const handleClickAddLevelRowBtn = (modelNum: number, level: number) => {
    if ([...tmpChartData].length >= 5) {
      toast.error(<Typography variant="body2">최대 다섯개까지 추가 가능합니다</Typography>);
      return;
    }
    const newItem: ChartData = {
      serviceID: currentService?.serviceID.toString() ?? '',
      modelNum: modelNum,
      label: `새 레이블${[...tmpChartData].length + 1}`,
      chartLabel: '새 차트 레이블',
      percentage: 100,
      level: level,
    };
    const newChartData = [...tmpChartData, newItem];
    setTmpChartData(newChartData);
  };

  /**
   * 단계 테이블의 특정 행을 삭제합니다
   * @param deleteRowLabel 삭제할 행 label
   */
  const handleClickDeleteLevelRowBtn = (deleteRowLabel: string) => {
    const newItems = tmpChartData.filter((item, idx) => item.label !== deleteRowLabel);
    shiftModelRows(newItems, modelNum, level);
  };

  /**
   * 입력 필드 값 변경 처리
   * @param event
   * @param index
   */
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = event.target;
    setTmpChartData((prevData) => prevData.map((item, i) => (i === index ? { ...item, [name]: value } : item)));
  };

  useEffect(() => {
    setTmpChartData(chartData);
  }, [chartData]);

  return (
    <Stack
      sx={{
        my: 2,
        borderRadius: '0.3rem',
        ...(editMode && {
          filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
          py: 2,
        }),
        transition: 'filter 0.3s ease-in-out, padding 0.1s ease',
      }}
    >
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ mb: 1 }}>
        <Stack direction={'row'} spacing={1} alignItems="center">
          <Typography variant="body2" fontSize={16}>{`단계 ${chartData[0].level}`}</Typography>
        </Stack>
        {editMode ? (
          <Stack direction={'row'} spacing={0.5}>
            <Button size="small" color="success" variant="contained" onClick={saveEditContent} sx={{ color: 'white' }}>
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
          !isEditing && (
            <Stack direction={'row'} spacing={0.5}>
              <Button size="small" variant="outlined" color="primary" onClick={enterEditMode}>
                <Typography variant="body1" fontSize={12}>
                  편집모드
                </Typography>
              </Button>

              <Button size="small" variant="outlined" color="error">
                <Typography
                  variant="body1"
                  fontSize={12}
                  onClick={() => {
                    openConfirmToast(`모델${modelNum + 1}의 ${level}단계를 삭제하시겠습니까?`, () =>
                      deleteModelLevel(modelNum, level)
                    );
                  }}
                >
                  단계삭제
                </Typography>
              </Button>
            </Stack>
          )
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
            {tmpChartData.map((data, idx) => (
              <TableRow
                key={`model-${data.modelNum}-level-${data.level}-row-${idx}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
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
                  {!editMode ? (
                    <DeleteIcon
                      fontSize="small"
                      sx={{
                        cursor: 'pointer',
                        color: 'rgba(0,0,0,0.6)',
                        ':hover': { color: '#BC544B' },
                        transition: 'all 0.2s linear',
                      }}
                      onClick={() => {
                        openConfirmToast(
                          `모델${modelNum + 1} 단계${data.level}의 [${data.label}]행을 삭제하시겠습니까?`,
                          () => {
                            handleClickDeleteLevelRowBtn(data.label);
                          }
                        );
                      }}
                    />
                  ) : (
                    '-'
                  )}
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
                      handleClickAddLevelRowBtn(modelNum, level);
                    }}
                  >
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} sx={{ py: 1 }}>
                      <AddCircleIcon sx={{ color: '#0069A0', mr: 1 }} />
                      <Typography variant="body2" sx={{ color: '#0069A0' }}>
                        행추가
                      </Typography>
                    </Stack>
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

export default memo(ModelLevelTable);
