'use client';

import { createContext, ReactNode, useState, useMemo } from 'react';

import { useUnivService } from '../hooks/context/use-univ-service';
import { useGetChartData } from '../hooks/use-get-chart-data';
import { getGroupedData } from '../components/overview/consultingapp-state-board/services/get-grouped-data';
import { ChartData } from '../types/chart-data.type';

export type ChartSettingContextValue = {
  chartData: ChartData[];
  groupedByModelNum: Record<number, ChartData[]>;
  modelNumbers: number[];
  addNewModel: () => void;
  getModelLevels: (modelNumber: number) => number[];
  addNewModelLevelRow: (modelNum: number, level: number) => void;
  setChartData: (chartData: ChartData[]) => void;
  shiftModelRows: (newItems: ChartData[], modelNum: number, level: number) => void;
};

export const ChartSettingContext = createContext<ChartSettingContextValue | undefined>(undefined);

export type ChartSettingProviderProps = {
  children: ReactNode;
};
const ChartSettingProvider = ({ children }: ChartSettingProviderProps) => {
  const { currentService } = useUnivService();
  const { chartData, setChartData } = useGetChartData(currentService?.serviceID ?? '');

  /**
   * 원본 chartData를 모델번호 - 배열 형태의 object로 만들어 반환합니다
   */
  const groupedByModelNum = useMemo(() => {
    const modelNums = Array.from(new Set(chartData.map((item) => item.modelNum)));
    return getGroupedData(chartData, 'modelNum', modelNums);
  }, [chartData]);

  const modelNumbers = useMemo(() => Object.keys(groupedByModelNum).map(Number), [groupedByModelNum]);

  const getModelLevels = (modelNumber: number) => {
    return Array.from(new Set(groupedByModelNum[Number(modelNumber)].map((item) => item.level)));
  };

  /**
   * 새로운 모델을 추가합니다
   */
  const addNewModel = () => {
    const newModelNum = Math.max(...modelNumbers) + 1;
    const newChartData: ChartData[] = [
      ...chartData,
      {
        serviceID: currentService?.serviceID!,
        modelNum: newModelNum,
        rowNum: 0,
        label: '새 레이블',
        chartLabel: '새 차트 레이블',
        percentage: 100,
        level: 1,
      },
    ];
    setChartData(newChartData);
  };

  /**
   * 특정 모델의 특정 단계에 새로운 행을 추가합니다
   * @param modelNum
   * @param level
   */
  const addNewModelLevelRow = (modelNum: number, level: number) => {
    const newItem: ChartData = {
      serviceID: currentService?.serviceID!,
      modelNum: modelNum,
      rowNum: 0,
      label: '새 레이블',
      chartLabel: '새 차트 레이블',
      percentage: 100,
      level: level,
    };
    const newChartData = [...chartData, newItem];
    setChartData(newChartData);
  };

  /**
   * 특정 모델에 포함된 특정 단계의 행들을 새로운 행들로 치환합니다
   * @param newItems 치환할 새로운 행들
   * @param modelNum 모델 번호
   * @param level 단계
   */
  const shiftModelRows = (newItems: ChartData[], modelNum: number, level: number) => {
    const newChartData = chartData.map((item) => {
      if (item.modelNum === modelNum && item.level === level) {
        return newItems.shift() || item;
      }
      return item;
    });
    setChartData(newChartData);
  };

  return (
    <ChartSettingContext.Provider
      value={{
        chartData,
        groupedByModelNum,
        modelNumbers,
        addNewModel,
        getModelLevels,
        addNewModelLevelRow,
        setChartData,
        shiftModelRows,
      }}
    >
      {children}
    </ChartSettingContext.Provider>
  );
};

export default ChartSettingProvider;
