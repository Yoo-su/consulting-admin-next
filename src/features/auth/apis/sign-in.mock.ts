import { HttpHandler, HttpResponse, http } from 'msw';
import { signinUrl } from './sign-in';

export const signin: HttpHandler = http.post(signinUrl, async ({ request }) => {
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
    name: 'KHG',
    userID: 'chess',
    role: 'developer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJ5b29zdSJ9.59LuJ69FHlGjREbbaB9xiXNudt7XY-nkt-HzG3gqMkM',
  },
};
