'use client';

import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useConfirmToast, useTypographyToast } from '@/shared/hooks';
import { useSharedStore } from '@/shared/models';

import { MAX_LEVEL_COUNT } from '../constants';
import { ChartData, useChartSettingStore } from '../models';
import { getNewChartData } from '../utils';
import { useChartDataMutation, useGetChartDataQuery } from '.';

type UseModelLevelTableProps = {
  modelNum: number;
  levelNum: number;
};
type UseModelLevelTableReturn = {
  editMode: boolean;
  tempChartData: ChartData[];
  handleEnterEditMode: () => void;
  handleSaveTableChanges: () => void;
  handleCancelEdit: () => void;
  handleFieldChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
  handleDeleteLevelRow: (deleteRowLabel: string) => void;
  handleAddLevelRow: () => void;
  handleDeleteLevel: () => void;
};

export const useModelLevelTable = ({ modelNum, levelNum }: UseModelLevelTableProps) => {
  const { showError } = useTypographyToast();
  const _return = useRef({} as UseModelLevelTableReturn);
  const currentService = useSharedStore((state) => state.currentService);
  const serviceID = currentService?.serviceID ?? '';
  const setIsEditing = useChartSettingStore((state) => state.setIsEditing);
  const { data: chartDatas } = useGetChartDataQuery(serviceID);
  const { setChartData } = useChartDataMutation();
  const { openConfirmToast } = useConfirmToast();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [tempChartData, setTempChartData] = useState<ChartData[]>([]);

  const levelChartData = useMemo(() => {
    return chartDatas?.filter((item) => item.modelNum === modelNum && item.level === levelNum) ?? [];
  }, [chartDatas, modelNum, levelNum]);

  // 편집 모드로 진입합니다
  const handleEnterEditMode = useCallback(() => {
    setIsEditing(true);
    setEditMode(true);
  }, []);

  // 테이블 변경 내용을 적용용하고 편집모드를 종료합니다
  const handleSaveTableChanges = useCallback(() => {
    const labelsSet = new Set();

    for (const item of [...tempChartData]) {
      if (labelsSet.has(item.label)) {
        showError(`[${item.label}] label이 중복되었습니다`, 'caption');
        return;
      }
      labelsSet.add(item.label);
    }
    handleShiftModelRows([...tempChartData]);
    setIsEditing(false);
    setEditMode(false);
  }, [modelNum, levelNum, tempChartData]);

  // 편집 취소 (임시 데이터를 원래 데이터로 복원)
  const handleCancelEdit = useCallback(() => {
    setTempChartData([...levelChartData]);
    setIsEditing(false);
    setEditMode(false);
  }, [levelChartData]);

  /**
   * 변경된 model-level chartData를 적용합니다.
   * 기존 chartData에서 변경된 model-level chartData만
   * 교체합니다다
   */
  const handleShiftModelRows = useCallback(
    (newItems: ChartData[]) => {
      const filtered = chartDatas?.filter((item) => !(item.modelNum === modelNum && item.level === levelNum)) ?? [];
      setChartData([...filtered, ...newItems].sort((a, b) => a.level - b.level));
    },
    [chartDatas, modelNum, levelNum]
  );

  // 모델의 특정 단계를 제거합니다
  const handleDeleteLevel = useCallback(() => {
    const confirmMessage = `모델${modelNum + 1}의 ${levelNum}단계를 삭제하시겠습니까?`;
    openConfirmToast({
      message: confirmMessage,
      callbackConfirm: () => {
        const filtered = chartDatas?.filter((item) => !(item.modelNum === modelNum && item.level === levelNum)) ?? [];
        setChartData([...filtered]);
      },
    });
  }, [chartDatas, modelNum, levelNum]);

  /**
   * 특정 모델의 특정 단계에 새로운 행을 추가합니다
   * @param modelNum
   * @param level
   */
  const handleAddLevelRow = useCallback(() => {
    if ([...tempChartData].length >= MAX_LEVEL_COUNT) {
      const toastMessage = `최대 ${MAX_LEVEL_COUNT}개까지 추가 가능합니다`;
      showError(toastMessage);
      return;
    }
    const newItem: ChartData = getNewChartData({
      serviceID,
      modelNum: modelNum,
      level: levelNum,
      label: `새 레이블${[...tempChartData].length + 1}`,
    });
    const newChartData = [...tempChartData, newItem];
    setTempChartData(newChartData);
  }, [tempChartData, modelNum, levelNum]);

  /**
   * 단계 테이블의 특정 행을 삭제합니다
   * @param deleteRowLabel 삭제할 행 label
   */
  const handleDeleteLevelRow = useCallback(
    (deleteRowLabel: string) => {
      const confirmMessage = `모델${modelNum + 1} 단계${levelNum}의 [${deleteRowLabel}]행을 삭제하시겠습니까?`;

      openConfirmToast({
        message: confirmMessage,
        callbackConfirm: () => {
          const newChartData = tempChartData.filter((item, idx) => item.label !== deleteRowLabel);
          handleShiftModelRows(newChartData);
        },
      });
    },
    [tempChartData, modelNum, levelNum]
  );

  /**
   * 입력 필드 값 변경 처리
   * @param event
   * @param index
   */
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = event.target;
    let parsed: string | number = value;
    if (name === 'percentage') parsed = parseInt(value);
    setTempChartData((prevData) => prevData.map((item, i) => (i === index ? { ...item, [name]: parsed } : item)));
  };

  useEffect(() => {
    setTempChartData([...levelChartData]);
  }, [levelChartData]);

  _return.current = {
    editMode,
    tempChartData,
    handleEnterEditMode,
    handleSaveTableChanges,
    handleCancelEdit,
    handleFieldChange,
    handleDeleteLevelRow,
    handleAddLevelRow,
    handleDeleteLevel,
  };
  return _return.current;
};
