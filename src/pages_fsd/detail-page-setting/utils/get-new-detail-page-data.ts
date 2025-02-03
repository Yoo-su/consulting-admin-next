import { DetailPageData } from '../models';

export const getNewDetailPageData = (serviceID: string, rowNumber: number): DetailPageData => {
  return {
    serviceID: serviceID,
    rowNum: rowNumber,
    condition: '[]',
    htmlCard: '',
    conditionText: '',
    mode: 'calc',
  };
};
