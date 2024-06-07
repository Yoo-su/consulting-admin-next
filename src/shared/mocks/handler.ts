import { HttpHandler } from 'msw';

import { signin } from '@/features/auth/apis/sign-in.mock';
import { getConsultingAppState } from '@/features/dashboard/apis/mocks/get-consultingapp-state.mock';
import { getUnivList } from '@/features/dashboard/apis/mocks/get-univ-list.mock';
import { getServiceList } from '@/features/dashboard/apis/mocks/get-service-list.mock';
import { updateConsultingAppState } from '@/features/dashboard/apis/mocks/update-consultingapp-state.mock';
import { getFoundationLibraries } from '@/features/dashboard/apis/mocks/get-foundation-libraries.mock';

export const handlers: HttpHandler[] = [
  signin,
  getConsultingAppState,
  getUnivList,
  getServiceList,
  updateConsultingAppState,
  getFoundationLibraries,
];
