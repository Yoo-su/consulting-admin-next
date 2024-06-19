/**
 *
 * @param data 원본 배열
 * @param groupingKey 그룹화에 사용할 키
 * @param keyList 키 값 목록
 * @returns
 */
export const getGroupedData = <T extends Record<K, any>, K extends keyof T>(
  data: T[],
  groupingKey: K,
  keyList: T[K][]
): Record<T[K], T[]> => {
  return data.reduce<Record<T[K], T[]>>(
    (acc, curr) => {
      const groupKey = curr[groupingKey];
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(curr);
      return acc;
    },
    keyList.reduce<Record<T[K], T[]>>((acc, curr) => {
      acc[curr] = [];
      return acc;
    }, Object.assign({}))
  );
};
