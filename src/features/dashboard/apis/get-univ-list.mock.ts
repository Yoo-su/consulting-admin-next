import { http, HttpHandler, HttpResponse } from 'msw';
import { apiUrls } from '@/shared/constants/api-urls';

export const getUnivList: HttpHandler = http.get(apiUrls.admin.getUnivList, async () => {
  return HttpResponse.json(GET_UNIV_LIST.success.univList);
});

export const GET_UNIV_LIST = {
  success: {
    univList: [
      {
        univID: '9998',
        univName: '진학대학교',
        univAddress: '서울특별시 종로구 경희궁길 12',
        longitude: '32.12345',
        latitude: '127.12598',
        isActive: true,
      },
    ],
  },
};
