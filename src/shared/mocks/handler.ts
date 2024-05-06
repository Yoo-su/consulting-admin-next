import { signin } from '@/features/auth/apis/sign-in.mock';
import { getConsultingAppState } from '@/features/dashboard/apis/get-consultingapp-state.mock';
import { getUnivList } from '@/features/dashboard/apis/get-univ-list.mock';
import { getServiceList } from '@/features/dashboard/apis/get-service-list.mock';

import { HttpHandler } from 'msw';

export const handlers: HttpHandler[] = [signin, getConsultingAppState, getUnivList, getServiceList];
