import { http, HttpHandler, HttpResponse } from 'msw';
import { apiUrls } from '@/shared/constants/api-urls';

export const getServiceList: HttpHandler = http.get(`${apiUrls.admin.getServiceList}`, async ({ request }) => {
  const url = new URL(request.url);
  const univID = url.searchParams.get('univID') ?? '';

  const result = GET_SERVICE_LIST.success.serviceList.filter((item) => item.univID === univID);
  return HttpResponse.json(result);
});

export const GET_SERVICE_LIST = {
  success: {
    serviceList: [
      {
        univID: '9998',
        serviceID: '999825',
        serviceName: '2024학년도 수시',
        isSusi: '1',
        schoolYear: '2024',
        developer: '유수현',
        manager: '류수현',
      },
      {
        univID: '9998',
        serviceID: '999824',
        serviceName: '2023학년도 정시',
        isSusi: '0',
        schoolYear: '2023',
        developer: '심슨',
        manager: '잭호퍼',
      },
      {
        univID: '9998',
        serviceID: '999823',
        serviceName: '2023학년도 수시',
        isSusi: '1',
        schoolYear: '2023',
        developer: '민들레',
        manager: '월터',
      },
      {
        univID: '9998',
        univName: '진학대학교',
        serviceID: '999822',
        serviceType: 'jungsi',
        serviceYear: '2024',
      },
    ],
  },
};
