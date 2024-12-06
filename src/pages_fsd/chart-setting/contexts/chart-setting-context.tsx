'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import { useUnivService } from '@/shared/hooks/context';

import { useGetChartData } from '../hooks';
import { ChartData } from '../models';

export type ChartSettingContextValue = {
  isLoading: boolean;
  chartData: ChartData[];
  modelNumbers: number[];
  hasChanges: boolean;
  syncChartData: () => void;
  addNewModel: () => void;
  deleteModel: (modelNum: number) => void;
  getModelLevels: (modelNum: number) => number[];
  setChartData: (newItems: ChartData[]) => void;
  shiftModelRows: (
    newItems: ChartData[],
    modelNum: number,
    level: number
  ) => void;
  addNewModelLevel: (modelNum: number) => void;
  deleteModelLevel: (modelNum: number, level: number) => void;
};

export const ChartSettingContext = createContext<
  ChartSettingContextValue | undefined
>(undefined);

export type ChartSettingProviderProps = {
  children: ReactNode;
};

export const ChartSettingProvider = ({
  children,
}: ChartSettingProviderProps) => {
  const { currentService } = useUnivService();
  const {
    chartData,
    originalData,
    setChartData,
    isLoading,
    execute,
    syncChartData,
  } = useGetChartData();

  // 차트 데이터의 변경 여부
  const hasChanges = useMemo(() => {
    const sortedOriginalData = [...originalData].sort(
        (a, b) => a.modelNum - b.modelNum
      ),
      sortedChartData = [...chartData].sort((a, b) => a.modelNum - b.modelNum);
    return (
      JSON.stringify(sortedOriginalData) !== JSON.stringify(sortedChartData)
    );
  }, [chartData, originalData]);

  // 모델 번호 목록
  const modelNumbers = useMemo(() => {
    return Array.from(new Set(chartData.map((item) => item.modelNum))).sort(
      (a, b) => a - b
    );
  }, [chartData]);

  // 특정 모델의 단계 Array를 반환합니다
  const getModelLevels = useCallback(
    (modelNum: number) => {
      return Array.from(
        new Set(
          chartData
            .filter((item) => item.modelNum === modelNum)
            .map((item) => item.level)
        )
      );
    },
    [chartData]
  );

  // 새로운 모델을 추가합니다
  const addNewModel = useCallback(() => {
    const newModelNum = chartData.length ? Math.max(...modelNumbers) + 1 : 0;
    const newChartData: ChartData[] = [
      ...chartData,
      {
        serviceID: currentService?.serviceID ?? '',
        modelNum: newModelNum,
        label: '새 레이블',
        percentage: 100,
        level: 1,
        chartLabel: '새 차트 레이블',
      },
    ];
    setChartData(newChartData);
  }, [chartData]);

  // 기존 모델을 삭제합니다
  const deleteModel = useCallback(
    (modelNum: number) => {
      const filtered = [...chartData].filter(
        (item) => item.modelNum !== modelNum
      );
      setChartData(filtered);
    },
    [chartData]
  );

  // 특정 모델에 포함된 특정 단계의 행들을 새로운 행들로 치환합니다
  const shiftModelRows = useCallback(
    (newItems: ChartData[], modelNum: number, level: number) => {
      const filtered = chartData.filter(
        (item) => !(item.modelNum === modelNum && item.level === level)
      );
      setChartData(
        [...filtered, ...newItems].sort((a, b) => a.level - b.level)
      );
    },
    [chartData]
  );

  // 특정 모델에 새로운 단계를 추가합니다
  const addNewModelLevel = useCallback(
    (modelNum: number) => {
      const modelLevels = getModelLevels(modelNum);
      const newLevel = Math.max(...modelLevels) + 1;
      const newLevelItem: ChartData = {
        serviceID: currentService?.serviceID ?? '',
        modelNum: modelNum,
        label: '새 레이블',
        percentage: 100,
        level: newLevel,
        chartLabel: '새 차트 레이블',
      };
      setChartData([...chartData, newLevelItem]);
    },
    [chartData]
  );

  // 특정 모델의 특정 단계를 제거합니다
  const deleteModelLevel = useCallback(
    (modelNum: number, level: number) => {
      const filtered = chartData.filter(
        (item) => !(item.modelNum === modelNum && item.level === level)
      );
      setChartData(filtered);
    },
    [chartData]
  );

  useEffect(() => {
    if (currentService) {
      execute(currentService.serviceID);
    }
  }, [currentService]);

  return (
    <ChartSettingContext.Provider
      value={{
        isLoading,
        chartData,
        modelNumbers,
        hasChanges,
        syncChartData,
        addNewModel,
        deleteModel,
        getModelLevels,
        setChartData,
        shiftModelRows,
        addNewModelLevel,
        deleteModelLevel,
      }}
    >
      {children}
    </ChartSettingContext.Provider>
  );
};
