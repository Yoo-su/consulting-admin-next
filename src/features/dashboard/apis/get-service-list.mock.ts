import { http, HttpHandler, HttpResponse } from 'msw';
import { GET_SERVICE_LIST_URL } from './get-service-list';

export const getServiceList: HttpHandler = http.get(GET_SERVICE_LIST_URL, () => {
  return HttpResponse.json(GET_SERVICE_LIST.success.serviceList);
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
    ],
  },
};
