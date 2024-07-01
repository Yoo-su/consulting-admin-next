import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { DetailPageData } from '../types/detail-page-data.type';

export const upsertDetailPageRow = async (serviceID: string, detailpageRow: DetailPageData) => {
  const transformedDetailpageRow = {
    ServiceID: detailpageRow.serviceID,
    RowNum: Number(detailpageRow.rowNum),
    Condition: detailpageRow.condition,
    HtmlCard: detailpageRow.htmlCard,
    ConditionText: detailpageRow.conditionText,
    Mode: detailpageRow.mode,
  };

  return await apiInstance.post(`${apiUrls.dashboard.detailpage}/${serviceID}`, {
    ...transformedDetailpageRow,
  });
};
