'use client';

import { Typography } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useConfirmToast } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { ChartData, useChartSettingStore } from '../models';
import { useChartDataMutation, useGetChartDataQuery } from '.';

type UseModelLevelTableProps = {
  modelNum: number;
  levelNum: number;
};
export const useModelLevelTable = ({
  modelNum,
  levelNum,
}: UseModelLevelTableProps) => {
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

  const enterEditMode = useCallback(() => {
    setIsEditing(true);
    setEditMode(true);
  }, []);

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

  // 특정 모델에 포함된 특정 단계의 행들을 새로운 행들로 치환합니다
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

  // 특정 모델의 특정 단계를 제거합니다
  const deleteModelLevel = useCallback(() => {
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

  // 특정 모델에 새로운 단계를 추가합니다
  const addNewModelLevel = useCallback(() => {
    const modelLevels = Array.from(
      new Set(levelChartData.map((item) => item.level))
    );
    const newLevel = Math.max(...modelLevels) + 1;
    const newLevelItem: ChartData = {
      serviceID: currentService?.serviceID ?? '',
      modelNum: modelNum,
      label: '새 레이블',
      percentage: 100,
      level: newLevel,
      chartLabel: '새 차트 레이블',
    };
    setChartData([...(chartData ?? []), newLevelItem]);
  }, [chartData]);

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

  return {
    editMode,
    tempChartData,
    levelChartData,
    enterEditMode,
    saveEdited,
    cancelEdit,
    addNewModelLevel,
    handleFieldChange,
    handleClickDeleteLevelRowBtn,
    handleClickAddLevelRowBtn,
    deleteModelLevel,
  };
};
