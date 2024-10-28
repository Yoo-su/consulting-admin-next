import { useQuery } from '@tanstack/react-query';
import { getBrowsedList } from '@/shared/apis/get-browsed-list';

export const useGetBrowsedListQuery = (path: string) => {
  return useQuery({
    queryKey: ['get-browsed-list', path],
    queryFn: () => getBrowsedList(path),
  });
};
