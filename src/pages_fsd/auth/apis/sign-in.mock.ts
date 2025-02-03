import { http, HttpHandler, HttpResponse } from 'msw';

import { API_URLS } from '@/shared/constants/api-urls';

export const signin: HttpHandler = http.post(API_URLS.user.signin, async ({ request }) => {
  type Body = {
    userID: string;
    password: string;
  };
  const body = await request.json();
  const { userID, password } = body as Body;

  if (userID === 'chess' && password === '1234') return HttpResponse.json(SIGN_IN.success);
  else return new HttpResponse(null, { status: 401 });
});

export const SIGN_IN = {
  success: {
    userName: '유수현',
    sub: 'chess',
    departmentID: 2,
  },
};
