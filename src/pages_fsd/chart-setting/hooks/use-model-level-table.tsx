'use client';

import { Typography } from '@mui/material';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-hot-toast';

import { useConfirmToast } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { ChartData, useChartSettingStore } from '../models';
import { useChartDataMutation, useGetChartDataQuery } from '.';

type UseModelLevelTableProps = {
  modelNum: number;
  levelNum: number;
};
type UseModelLevelTableReturn = {
  editMode: boolean;
  tempChartData: ChartData[];
  levelChartData: ChartData[];
  enterEditMode: () => void;
  saveEdited: () => void;
  cancelEdit: () => void;
  handleFieldChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
  handleClickDeleteLevelRowBtn: (deleteRowLabel: string) => void;
  handleClickAddLevelRowBtn: () => void;
  handleClickDeleteLevelBtn: () => void;
};

export const useModelLevelTable = ({
  modelNum,
  levelNum,
}: UseModelLevelTableProps) => {
  const _return = useRef({} as UseModelLevelTableReturn);
  const currentService = useSharedStore((state) => state.currentService);
  const setIsEditing = useChartSettingStore((state) => state.setIsEditing);
  const { setChartData } = useChartDataMutation();
  const { data: chartData } = useGetChartDataQuery(
    currentService?.serviceID ?? ''
  );
  const { openConfirmToast } = useConfirmToast();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [tempChartData, setTempChartData] = useState<ChartData[]>([]);

  const levelChartData = useMemo(() => {
    return (
      chartData?.filter(
        (item) => item.modelNum === modelNum && item.level === levelNum
      ) ?? []
    );
  }, [chartData, modelNum, levelNum]);

  // 편집 모드로 진입합니다
  const enterEditMode = useCallback(() => {
    setIsEditing(true);
    setEditMode(true);
  }, []);

  // 테이블 변경 내용을 적용용하고 편집모드를 종료합니다
  const saveEdited = useCallback(() => {
    const labelsSet = new Set();

    for (const item of [...tempChartData]) {
      if (labelsSet.has(item.label)) {
        toast.error(
          <Typography variant="body2">
            [{item.label}] label이 중복되었습니다
          </Typography>
        );
        return;
      }
      labelsSet.add(item.label);
    }
    shiftModelRows([...tempChartData]);
    setIsEditing(false);
    setEditMode(false);
  }, [modelNum, levelNum, tempChartData]);

  // 편집 취소 (임시 데이터를 원래 데이터로 복원)
  const cancelEdit = useCallback(() => {
    setTempChartData([...levelChartData]);
    setIsEditing(false);
    setEditMode(false);
  }, [levelChartData]);

  /**
   * 변경된 model-level chartData를 적용합니다.
   * 기존 chartData에서 변경된 model-level chartData만
   * 교체합니다다
   */
  const shiftModelRows = useCallback(
    (newItems: ChartData[]) => {
      const filtered =
        chartData?.filter(
          (item) => !(item.modelNum === modelNum && item.level === levelNum)
        ) ?? [];
      setChartData(
        [...filtered, ...newItems].toSorted((a, b) => a.level - b.level)
      );
    },
    [chartData, modelNum, levelNum]
  );

  // 모델의 특정 단계를 제거합니다
  const handleClickDeleteLevelBtn = useCallback(() => {
    openConfirmToast(
      `모델${modelNum + 1}의 ${levelNum}단계를 삭제하시겠습니까?`,
      () => {
        const filtered =
          chartData?.filter(
            (item) => !(item.modelNum === modelNum && item.level === levelNum)
          ) ?? [];
        setChartData([...filtered]);
      }
    );
  }, [chartData, modelNum, levelNum]);

  /**
   * 특정 모델의 특정 단계에 새로운 행을 추가합니다
   * @param modelNum
   * @param level
   */
  const handleClickAddLevelRowBtn = useCallback(() => {
    if ([...tempChartData].length >= 5) {
      toast.error(
        <Typography variant="body2">최대 다섯개까지 추가 가능합니다</Typography>
      );
      return;
    }
    const newItem: ChartData = {
      serviceID: currentService?.serviceID ?? '',
      modelNum: modelNum,
      label: `새 레이블${[...tempChartData].length + 1}`,
      percentage: 100,
      level: levelNum,
      chartLabel: '새 차트 레이블',
    };
    const newChartData = [...tempChartData, newItem];
    setTempChartData(newChartData);
  }, [tempChartData, modelNum, levelNum]);

  /**
   * 단계 테이블의 특정 행을 삭제합니다
   * @param deleteRowLabel 삭제할 행 label
   */
  const handleClickDeleteLevelRowBtn = useCallback(
    (deleteRowLabel: string) => {
      openConfirmToast(
        `모델${
          modelNum + 1
        } 단계${levelNum}의 [${deleteRowLabel}]행을 삭제하시겠습니까?`,
        () => {
          const newChartData = tempChartData.filter(
            (item, idx) => item.label !== deleteRowLabel
          );
          shiftModelRows(newChartData);
        }
      );
    },
    [tempChartData, modelNum, levelNum]
  );

  /**
   * 입력 필드 값 변경 처리
   * @param event
   * @param index
   */
  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    let parsed: string | number = value;
    if (name === 'percentage') parsed = parseInt(value);
    setTempChartData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, [name]: parsed } : item
      )
    );
  };

  useEffect(() => {
    setTempChartData([...levelChartData]);
  }, [levelChartData]);

  _return.current = {
    editMode,
    tempChartData,
    levelChartData,
    enterEditMode,
    saveEdited,
    cancelEdit,
    handleFieldChange,
    handleClickDeleteLevelRowBtn,
    handleClickAddLevelRowBtn,
    handleClickDeleteLevelBtn,
  };
  return _return.current;
};
