import { HttpHandler } from 'msw';

import { signin } from '@/features/auth/apis/sign-in.mock';
import { getConsultingAppState } from '@/features/dashboard/apis/get-consultingapp-state.mock';
import { getUnivList } from '@/features/dashboard/apis/get-univ-list.mock';
import { getServiceList } from '@/features/dashboard/apis/get-service-list.mock';
import { updateConsultingAppState } from '@/features/dashboard/apis/update-consultingapp-state.mock';
import { getFoundationLibraries } from '@/features/dashboard/apis/get-foundation-libraries.mock';

export const handlers: HttpHandler[] = [
  signin,
  getConsultingAppState,
  getUnivList,
  getServiceList,
  updateConsultingAppState,
  getFoundationLibraries,
];
