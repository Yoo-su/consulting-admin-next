import { getCurrentServiceType, isCurrentServiceYear } from '@/shared/services';

export const getPrevLocation = ({
  isCurrentService,
  schoolYear = '',
  isSusi = '',
}: {
  isCurrentService: boolean;
  schoolYear: string | undefined;
  isSusi: string | undefined;
}) => {
  const prevLocation = isCurrentService ? '' : `/${schoolYear}${isSusi === '1' ? 'susi' : 'jungsi'}`;
  return prevLocation;
};

export const isCurrentServiceType = (schoolYear: string | undefined = '', isSusi: string | undefined = '1') => {
  const isCurrentYear = isCurrentServiceYear(schoolYear);
  const currentSchoolType = getCurrentServiceType();
  const isCurrentServiceType = currentSchoolType === (isSusi === '1' ? 'susi' : 'jungsi');

  return isCurrentYear && isCurrentServiceType;
};
