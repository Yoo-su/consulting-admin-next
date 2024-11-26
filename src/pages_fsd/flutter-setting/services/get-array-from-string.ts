export const getArrayFromString = (value: string) => {
  if (typeof value !== 'string') return '';
  return value
    .slice(1, -1)
    .split(',')
    .map((value) => value.toString());
};
