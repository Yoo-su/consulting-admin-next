import { http, HttpHandler, HttpResponse } from 'msw';
import { GET_FOUNDATION_LIBRARY_URL } from './get-foundation-library';

export const getServiceList: HttpHandler = http.get(GET_FOUNDATION_LIBRARY_URL('999825'), () => {
  return HttpResponse.json(GET_FOUNDATION_LIBRARY.success.foundationLibraryList);
});

const GET_FOUNDATION_LIBRARY = {
  success: {
    foundationLibraryList: [
      {
        ServiceID: 999825,
        FileName: 'base-excel/999825/consulting_999825_20240510105625_yoosu.xls',
        UploadDate: '2024-05-10T01:56:25.196Z',
        ModifyUser: 'yoosu',
      },
      {
        ServiceID: 999825,
        FileName: 'base-excel/999825/consulting_999825_20240510105526_yoosu.xls',
        UploadDate: '2024-05-10T01:55:26.863Z',
        ModifyUser: 'yoosu',
      },
      {
        ServiceID: 999825,
        FileName: 'base-excel/999825/consulting_999825_20240510105509_yoosu.xls',
        UploadDate: '2024-05-10T01:55:09.850Z',
        ModifyUser: 'yoosu',
      },
      {
        ServiceID: 999825,
        FileName: 'base-excel/999825/consulting_999825_20240510105311_yoosu.xls',
        UploadDate: '2024-05-10T01:53:11.610Z',
        ModifyUser: 'yoosu',
      },
      {
        ServiceID: 999825,
        FileName: 'base-excel/999825/consulting_999825_20240510105244_yoosu.xls',
        UploadDate: '2024-05-10T01:52:44.833Z',
        ModifyUser: 'yoosu',
      },
      {
        ServiceID: 999825,
        FileName: 'base-excel/999825/consulting_999825_20240510104658_chess.xls',
        UploadDate: '2024-05-10T01:46:58.886Z',
        ModifyUser: 'chess',
      },
      {
        ServiceID: 999825,
        FileName: 'base-excel/999825/consulting_999825_20240510104647_yoosu.xls',
        UploadDate: '2024-05-10T01:46:47.393Z',
        ModifyUser: 'yoosu',
      },
    ],
  },
};
