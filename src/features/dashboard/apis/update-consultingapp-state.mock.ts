import { http, HttpHandler, HttpResponse } from 'msw';
import { UPDATE_CONSULTINGAPP_STATE_URL } from './update-consultingapp-state';

export const updateConsultingAppState: HttpHandler = http.patch(UPDATE_CONSULTINGAPP_STATE_URL, () => {
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
