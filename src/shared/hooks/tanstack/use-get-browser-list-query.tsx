import { useQuery } from '@tanstack/react-query';

import { getBrowserList } from '@/shared/apis/get-browsed-list';
import { QUERY_KEYS } from '@/shared/constants';

export const useGetBrowserListQuery = (path: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.browser.items(path).queryKey,
    queryFn: async () => await getBrowserList(path),
    select: (data) => ({
      items: data.items,
      length: data.items.length,
    }),
  });
};
