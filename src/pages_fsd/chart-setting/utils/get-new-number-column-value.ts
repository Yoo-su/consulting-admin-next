import { ChartData } from '../models';
import { getDistinctColumnValues } from './get-distinct-column-values';

/**
 * @param chartData chartData 배열
 * @param keyColumn 컬럼 키
 * @param defaultNumber 최초 생성의 경우 설정할 기본 값값
 * @returns
 */
export const getNewNumberColumnValue = (
  chartData: ChartData[],
  keyColumn: keyof ChartData,
  defaultNumber: number
): number => {
  const numbers = getDistinctColumnValues(chartData, keyColumn) as number[];
  return chartData?.length ? Math.max(...numbers) + 1 : defaultNumber;
};
