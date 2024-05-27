import { HttpHandler, HttpResponse, http } from 'msw';
import { apiUrls } from '@/shared/constants/api-urls';

export const signin: HttpHandler = http.post(apiUrls.user.signin, async ({ request }) => {
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
