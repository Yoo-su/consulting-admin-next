import { http, HttpHandler, HttpResponse } from 'msw';
import { apiUrls } from '@/shared/constants/api-urls';

export const updateConsultingAppState: HttpHandler = http.patch(apiUrls.dashboard.consultingAppState, () => {
  return HttpResponse.json(UPDATE_CONSULGINGAPP_STATE.success.data);
});

export const UPDATE_CONSULGINGAPP_STATE = {
  success: {
    data: {
      success: true,
      message: 'state successfully updated',
    },
  },
};
