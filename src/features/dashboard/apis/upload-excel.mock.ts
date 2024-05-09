import { http, HttpHandler, HttpResponse } from 'msw';
import { UPLOAD_EXCEL_URL } from './upload-excel';

export const uploadExcel: HttpHandler = http.post(UPLOAD_EXCEL_URL, () => {
  return HttpResponse.json(UPLOAD_EXCEL.success.result);
});

const UPLOAD_EXCEL = {
  success: {
    result: {
      success: true,
      message: '엑셀이 성공적으로 업로드 되었습니다',
    },
  },
};
