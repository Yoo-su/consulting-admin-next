import { HttpHandler } from 'msw';

import { signin } from '@/pages_fsd/auth/apis/sign-in.mock';

export const handlers: HttpHandler[] = [signin];
