import { apiInstance } from '@/shared/plugin/axios';
import { apiUrls } from '@/shared/constants/api-urls';
import { Univ } from '@/shared/types/univ.type';

export const getUnivListUrl = `${process.env.NEXT_PUBLIC_BASE_URL + apiUrls.setup.getUnivList}`;

export const getUnivList = async () => {
  return await apiInstance.get<Univ[]>(getUnivListUrl);
};
