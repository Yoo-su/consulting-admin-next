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
    name: '유수현',
    userID: 'chess',
    role: 'developer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJ5b29zdSJ9.59LuJ69FHlGjREbbaB9xiXNudt7XY-nkt-HzG3gqMkM',
  },
};
