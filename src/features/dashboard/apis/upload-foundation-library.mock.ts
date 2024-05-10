import { http, HttpHandler, HttpResponse } from 'msw';
import { UPLOAD_FOUNDATION_LIBRARY_URL } from './upload-foundation-library';

export const uploadFoundationLibrary: HttpHandler = http.post(UPLOAD_FOUNDATION_LIBRARY_URL, () => {
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
