import { http, HttpHandler, HttpResponse } from 'msw';
import { updateConsultingAppStateUrl } from './update-consultingapp-state';

export const updateConsultingAppState: HttpHandler = http.patch(updateConsultingAppStateUrl, () => {
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
