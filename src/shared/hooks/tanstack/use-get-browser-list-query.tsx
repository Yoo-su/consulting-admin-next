import { useQuery } from '@tanstack/react-query';
import { getBrowserList } from '@/shared/apis/get-browsed-list';

export const useGetBrowserListQuery = (path: string) => {
  return useQuery({
    queryKey: ['get-browser-list', path],
    queryFn: async () => await getBrowserList(path),
    select: (data) => ({
      items: data.items,
      length: data.items.length,
    }),
  });
};
