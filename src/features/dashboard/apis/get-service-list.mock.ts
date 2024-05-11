import { http, HttpHandler, HttpResponse } from 'msw';
import { GET_SERVICE_LIST_URL } from './get-service-list';

export const getServiceList: HttpHandler = http.get(GET_SERVICE_LIST_URL, async ({ request }) => {
  const url = new URL(request.url);
  const univID = url.searchParams.get('univID') ?? '';

  const result = GET_SERVICE_LIST.success.serviceList.filter((item) => item.univID === Number(univID));
  return HttpResponse.json(result);
});

export const GET_SERVICE_LIST = {
  success: {
    serviceList: [
      {
        univID: 9998,
        serviceID: 999825,
        serviceType: 'susi',
        serviceYear: '2024',
        univName: '진학대학교',
      },
      {
        univID: 9998,
        univName: '진학대학교',
        serviceID: 999824,
        serviceType: 'jungsi',
        serviceYear: '2023',
      },
      {
        univID: 9998,
        univName: '진학대학교',
        serviceID: 999823,
        serviceType: 'susi',
        serviceYear: '2023',
      },
      {
        univID: 9998,
        univName: '진학대학교',
        serviceID: 999822,
        serviceType: 'jungsi',
        serviceYear: '2024',
      },
      {
        univID: 1129,
        serviceID: 112925,
        serviceType: 'susi',
        serviceYear: '2024',
        univName: '건국대학교',
      },
      {
        univID: 1129,
        univName: '건국대학교',
        serviceID: 112924,
        serviceType: 'jungsi',
        serviceYear: '2023',
      },
      {
        univID: 1359,
        univName: '동국대학교',
        serviceID: 135923,
        serviceType: 'susi',
        serviceYear: '2023',
      },
      {
        univID: 1359,
        univName: '동국대학교',
        serviceID: 135922,
        serviceType: 'jungsi',
        serviceYear: '2024',
      },
    ],
  },
};
