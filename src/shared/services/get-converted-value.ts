export const getConvertedValue = (value: string) => {
  if (!value) return;
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value.includes('[') && value.includes(']'))
    return value.replace(/[[\]'"]/g, '').split(',');
  if (value.includes('{') && value.includes('}')) return JSON.parse(value);
};
