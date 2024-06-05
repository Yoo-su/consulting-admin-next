'use client';

import { createContext, ReactNode, useState, useMemo, useEffect, Dispatch, SetStateAction } from 'react';

import { useUnivService } from '../hooks/context/use-univ-service';
import { useGetChartData } from '../hooks/use-get-chart-data';
import { ChartData } from '../types/chart-data.type';

export type ChartSettingContextValue = {
  isLoading: boolean;
  chartData: ChartData[];
  modelNumbers: number[];
  selectedModel: number | null;
  hasChanges: boolean;
  addNewModel: () => void;
  deleteModel: (modelNum: number) => void;
  getModelLevels: (modelNum: number) => number[];
  setChartData: (newItems: ChartData[]) => void;
  shiftModelRows: (newItems: ChartData[], modelNum: number, level: number) => void;
  setSelectedModel: Dispatch<SetStateAction<number | null>>;
  addNewModelLevel: (modelNum: number) => void;
  deleteModelLevel: (modelNum: number, level: number) => void;
};

export const ChartSettingContext = createContext<ChartSettingContextValue | undefined>(undefined);

export type ChartSettingProviderProps = {
  children: ReactNode;
};
const ChartSettingProvider = ({ children }: ChartSettingProviderProps) => {
  const { currentService } = useUnivService();
  const { chartData, originalData, setChartData, isLoading, execute } = useGetChartData();
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  // 차트데이터의 변경 여부
  const hasChanges = useMemo(() => {
    return JSON.stringify(originalData) !== JSON.stringify(chartData);
  }, [chartData]);

  const modelNumbers = useMemo(
    () => Array.from(new Set(chartData.map((item) => item.modelNum))).sort((a, b) => a - b),
    [chartData]
  );

  /**
   * 특정 모델의 단계 Array를 반환합니다
   * @param modelNum
   * @returns
   */
  const getModelLevels = (modelNum: number) => {
    const modelItems = chartData.filter((item) => item.modelNum === modelNum);
    return Array.from(new Set(modelItems.map((item) => item.level)));
  };

  /**
   * 새로운 모델을 추가합니다
   */
  const addNewModel = () => {
    const newModelNum = chartData.length ? Math.max(...modelNumbers) + 1 : 0;
    const newChartData: ChartData[] = [
      ...chartData,
      {
        serviceID: currentService?.serviceID ?? '',
        modelNum: newModelNum,
        label: '새 레이블',
        chartLabel: '새 차트 레이블',
        percentage: 100,
        level: 1,
      },
    ];
    setChartData(newChartData);
  };

  /**
   * 기존 모델을 삭제합니다
   * @param modelNum
   */
  const deleteModel = (modelNum: number) => {
    const filtered = chartData.filter((item) => item.modelNum !== modelNum);
    setChartData([...filtered]);
    setSelectedModel(null);
  };

  /**
   * 특정 모델에 포함된 특정 단계의 행들을 새로운 행들로 치환합니다
   * @param newItems 치환할 새로운 행들
   * @param modelNum 모델 번호
   * @param level 단계
   */
  const shiftModelRows = (newItems: ChartData[], modelNum: number, level: number) => {
    const filtered = chartData.filter((item) => !(item.modelNum === modelNum && item.level === level));
    setChartData([...filtered, ...newItems].sort((a, b) => a.level - b.level));
  };

  /**
   * 특정 모델에 새로운 단계를 추가합니다
   * @param modelNum
   */
  const addNewModelLevel = (modelNum: number) => {
    const modelLevels = getModelLevels(modelNum);
    const newLevel = Math.max(...modelLevels) + 1;
    const newLevelItem: ChartData = {
      serviceID: currentService?.serviceID ?? '',
      modelNum: modelNum,
      label: '새 레이블',
      chartLabel: '새 차트 레이블',
      percentage: 100,
      level: newLevel,
    };
    setChartData([...chartData, newLevelItem]);
  };

  /**
   * 특정 모델의 특정 단계를 제거합니다
   * @param modelNum
   * @param level
   */
  const deleteModelLevel = (modelNum: number, level: number) => {
    const filtered = chartData.filter((item) => !(item.modelNum === modelNum && item.level === level));
    setChartData([...filtered]);

    const isRemaining = filtered.findIndex((item) => item.modelNum === modelNum) !== -1;
    if (!isRemaining) setSelectedModel(null);
  };

  useEffect(() => {
    if (currentService) {
      execute(currentService.serviceID);
      setSelectedModel(null);
    }
  }, [currentService]);

  return (
    <ChartSettingContext.Provider
      value={{
        isLoading,
        chartData,
        modelNumbers,
        hasChanges,
        selectedModel,
        addNewModel,
        deleteModel,
        getModelLevels,
        setChartData,
        shiftModelRows,
        setSelectedModel,
        addNewModelLevel,
        deleteModelLevel,
      }}
    >
      {children}
    </ChartSettingContext.Provider>
  );
};

export default ChartSettingProvider;
