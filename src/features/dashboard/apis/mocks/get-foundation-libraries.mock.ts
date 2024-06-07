import { http, HttpHandler, HttpResponse } from 'msw';
import { apiUrls } from '@/shared/constants/api-urls';

export const getFoundationLibraries: HttpHandler = http.get(apiUrls.dashboard.foundationLibrary + '/999825', () => {
  return HttpResponse.json(GET_FOUNDATION_LIBRARY.success.foundationLibraryList);
});

const GET_FOUNDATION_LIBRARY = {
  success: {
    foundationLibraryList: [
      {
        serviceID: 999825,
        fileName: 'base-excel/999825/consulting_999825_20240510105625_yoosu.xls',
        uploadDate: '2024-05-10T01:56:25.196Z',
        modifyUser: 'yoosu',
        url: '',
      },
      {
        serviceID: 999825,
        fileName: 'base-excel/999825/consulting_999825_20240510105526_yoosu.xls',
        uploadDate: '2024-05-10T01:55:26.863Z',
        modifyUser: 'yoosu',
        url: '',
      },
      {
        serviceID: 999825,
        fileName: 'base-excel/999825/consulting_999825_20240510105509_yoosu.xls',
        uploadDate: '2024-05-10T01:55:09.850Z',
        modifyUser: 'yoosu',
        url: '',
      },
      {
        serviceID: 999825,
        fileName: 'base-excel/999825/consulting_999825_20240510105311_yoosu.xls',
        uploadDate: '2024-05-10T01:53:11.610Z',
        modifyUser: 'yoosu',
        url: '',
      },
      {
        serviceID: 999825,
        fileName: 'base-excel/999825/consulting_999825_20240510105244_yoosu.xls',
        uploadDate: '2024-05-10T01:52:44.833Z',
        modifyUser: 'yoosu',
        url: '',
      },
      {
        serviceID: 999825,
        fileName: 'base-excel/999825/consulting_999825_20240510104658_chess.xls',
        uploadDate: '2024-05-10T01:46:58.886Z',
        modifyUser: 'chess',
        url: '',
      },
      {
        serviceID: 999825,
        fileName: 'base-excel/999825/consulting_999825_20240510104647_yoosu.xls',
        uploadDate: '2024-05-10T01:46:47.393Z',
        modifyUser: 'yoosu',
        url: '',
      },
    ],
  },
};
