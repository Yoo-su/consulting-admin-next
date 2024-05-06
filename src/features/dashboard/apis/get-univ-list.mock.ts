import { http, HttpHandler, HttpResponse } from 'msw';
import { getUnivListUrl } from './get-univ-list';

export const getUnivList: HttpHandler = http.get(getUnivListUrl, () => {
  return HttpResponse.json(GET_UNIN_LIST.success.data);
});

export const GET_UNIN_LIST = {
  success: {
    data: [
      {
        univID: '9998',
        univName: '진학대학교',
      },
      {
        univID: '1359',
        univName: '동국대학교',
      },
      {
        univID: '1129',
        univName: '건국대학교',
      },
      {
        univID: '6121',
        univName: '고려대학교',
      },
    ],
  },
};
