/**
 * 객체 내의 특정 키를 기준으로 해당 키에 오는 값들을 찾아 그 값들을 key로 하는
 * 그룹화된 객체 생성 메서드
 * @param states 그룹화를 원하는 원본 consulting-app-states
 * @param key 그룹화의 기준이 될 키
 * @returns
 */
export const getGroupedStatesObject = <T extends Record<K, any>, K extends keyof T>(
  states: T[],
  key: K
): Record<T[K], T[]> => {
  return states.reduce<Record<T[K], T[]>>((acc, curr) => {
    const groupKey = curr[key];
    acc[groupKey] = [...(acc[groupKey] || []), curr];
    return acc;
  }, Object.create(null));
};
