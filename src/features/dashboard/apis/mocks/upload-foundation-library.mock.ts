import { http, HttpHandler, HttpResponse } from 'msw';
import { apiUrls } from '@/shared/constants/api-urls';

export const uploadFoundationLibrary: HttpHandler = http.post(apiUrls.dashboard.foundationLibrary, () => {
  return HttpResponse.json(UPLOAD_FOUNDATION_LIBRARY.success.result);
});

const UPLOAD_FOUNDATION_LIBRARY = {
  success: {
    result: {
      statusCode: 200,
      message: '엑셀이 성공적으로 업로드 되었습니다',
    },
  },
};
