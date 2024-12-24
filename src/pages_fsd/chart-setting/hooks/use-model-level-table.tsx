import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { QUERY_KEYS } from '@/shared/constants';
import { useSharedStore } from '@/shared/models';

import { ChartData } from '../models';
import { useGetChartDataQuery } from '.';

type UseModelLevelTableProps = {
  modelNum: number;
  levelNum: number;
};
export const useModelLevelTable = ({
  modelNum,
  levelNum,
}: UseModelLevelTableProps) => {
  const queryClient = useQueryClient();
  const { currentService } = useSharedStore();
  const { data: chartData } = useGetChartDataQuery(
    currentService?.serviceID ?? ''
  );

  const levelChartData = useMemo(() => {
    return chartData.filter(
      (item) => item.modelNum === modelNum && item.level === levelNum
    );
  }, [chartData, modelNum, levelNum]);

  // 특정 모델에 포함된 특정 단계의 행들을 새로운 행들로 치환합니다
  const shiftModelRows = useCallback(
    (newItems: ChartData[], modelNum: number, level: number) => {
      const filtered = chartData.filter(
        (item) => !(item.modelNum === modelNum && item.level === level)
      );
      queryClient.setQueryData(
        QUERY_KEYS['chart-setting']['chart-data'](
          currentService?.serviceID ?? ''
        ).queryKey,
        () => {
          return [...filtered, ...newItems].sort((a, b) => a.level - b.level);
        }
      );
    },
    [chartData]
  );
};
