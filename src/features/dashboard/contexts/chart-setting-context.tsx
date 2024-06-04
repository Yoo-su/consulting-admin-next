'use client';

import { createContext, ReactNode, useState, useMemo, useEffect, Dispatch, SetStateAction } from 'react';

import { useUnivService } from '../hooks/context/use-univ-service';
import { useGetChartData } from '../hooks/use-get-chart-data';
import { getGroupedData } from '../components/overview/consultingapp-state-board/services/get-grouped-data';
import { ChartData } from '../types/chart-data.type';

export type ChartSettingContextValue = {
  isLoading: boolean;
  chartData: ChartData[];
  groupedByModelNum: Record<number, ChartData[]>;
  modelNumbers: number[];
  selectedModel: number | null;
  hasChanges: boolean;
  addNewModel: () => void;
  deleteModel: (modelNum: number) => void;
  getModelLevels: (modelNum: number) => number[];
  setChartData: (newItems: ChartData[]) => void;
  shiftModelRows: (newItems: ChartData[], modelNum: number, level: number) => void;
  setSelectedModel: Dispatch<SetStateAction<number | null>>;
  syncOriginData: () => void;
  addNewModelLevel: (modelNum: number) => void;
  deleteModelLevel: (modelNum: number, level: number) => void;
};

export const ChartSettingContext = createContext<ChartSettingContextValue | undefined>(undefined);

export type ChartSettingProviderProps = {
  children: ReactNode;
};
const ChartSettingProvider = ({ children }: ChartSettingProviderProps) => {
  const { currentService } = useUnivService();
  const { chartData, setChartData, isLoading } = useGetChartData(currentService?.serviceID ?? '');
  const [originChartData, setOriginChartData] = useState<ChartData[]>([]);
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  const hasChanges = useMemo(() => {
    if (!originChartData.length) return false;
    return JSON.stringify(originChartData) !== JSON.stringify(chartData);
  }, [originChartData, chartData]);

  /**
   *  모델 번호로 그룹핑된 데이터
   */
  const groupedByModelNum = useMemo(() => {
    const modelNumbers = Array.from(new Set(chartData.map((item) => item.modelNum)));
    return getGroupedData(chartData, 'modelNum', modelNumbers);
  }, [chartData]);

  const modelNumbers = useMemo(
    () => Array.from(new Set(chartData.map((item) => item.modelNum))).sort((a, b) => a - b),
    [groupedByModelNum]
  );

  /**
   * 특정 모델의 단계 Array를 반환합니다
   * @param modelNum
   * @returns
   */
  const getModelLevels = (modelNum: number) => {
    return Array.from(new Set(groupedByModelNum[modelNum].map((item) => item.level)));
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
   * 변경 여부 감지를 위한 origin-data를 현재 chartData와 동기화합니다.
   */
  const syncOriginData = () => {
    setOriginChartData(chartData);
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
    if (!originChartData.length) setOriginChartData(chartData);
  }, [chartData, originChartData]);

  return (
    <ChartSettingContext.Provider
      value={{
        isLoading,
        chartData,
        groupedByModelNum,
        modelNumbers,
        hasChanges,
        selectedModel,
        addNewModel,
        deleteModel,
        getModelLevels,
        setChartData,
        shiftModelRows,
        setSelectedModel,
        syncOriginData,
        addNewModelLevel,
        deleteModelLevel,
      }}
    >
      {children}
    </ChartSettingContext.Provider>
  );
};

export default ChartSettingProvider;
