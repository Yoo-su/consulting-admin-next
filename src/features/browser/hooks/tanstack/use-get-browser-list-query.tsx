import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/shared/constants';

import { getBrowserList } from '../../apis';

export const useGetBrowserListQuery = (path: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.browser.data(path).queryKey,
    queryFn: async () => await getBrowserList(path),
    select: (data) => ({
      items: data.items.sort((a, b) => {
        const dateA = new Date(a.lastModified).getTime();
        const dateB = new Date(b.lastModified).getTime();
        return dateB - dateA;
      }),
      length: data.items.length,
    }),
    enabled: !!path,
  });
};
