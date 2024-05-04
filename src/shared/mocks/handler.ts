import { signin } from '@/features/auth/apis/sign-in.mock';
import { getConsultingAppState } from '@/features/dashboard/apis/get-consultingapp-state.mock';

import { HttpHandler } from 'msw';

export const handlers: HttpHandler[] = [signin, getConsultingAppState];
