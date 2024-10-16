import { HttpHandler } from 'msw';

import { signin } from '@/features/auth/apis/sign-in.mock';

export const handlers: HttpHandler[] = [signin];
