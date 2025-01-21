import { Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import toast from 'react-hot-toast';

import { QUERY_KEYS } from '@/shared/constants';
import { useSharedStore } from '@/shared/models';

import { updateDetailPageData } from '../../apis';
import { DetailPageData } from '../../models';

type UseDetailPageSettingReturn = {
  isPostDetailPageDataLoading: boolean;
  isPostDetailPageDataSuccess: boolean;
  postDetailPageData: (detailPageData: DetailPageData[]) => void;
  setDetailPageData: (newData: DetailPageData[]) => void;
};
type UseDetailPageSettingMutation = () => UseDetailPageSettingReturn;
export const useDetailPageSettingMutation: UseDetailPageSettingMutation =
  () => {
    const _return = useRef({} as UseDetailPageSettingReturn);
    const queryClient = useQueryClient();
    const currentService = useSharedStore((state) => state.currentService);
    const serviceID = currentService?.serviceID ?? '';

    const {
      mutateAsync: postDetailPageData,
      isPending: isPostDetailPageDataLoading,
      isSuccess: isPostDetailPageDataSuccess,
    } = useMutation({
      mutationFn: (detailPageData: DetailPageData[]) =>
        updateDetailPageData(serviceID, detailPageData),
      onSuccess: () => {
        toast.success(
          <Typography variant="caption">
            상세페이지 정보 업데이트 완료!
          </Typography>
        );
      },
      onError: () => {
        toast.error(
          <Typography variant="caption">
            상세페이지 정보 업데이트 중 문제가 발생했습니다
          </Typography>
        );
      },
    });

    const setDetailPageData = useCallback(
      (newData: DetailPageData[]) => {
        queryClient.setQueryData(
          QUERY_KEYS['detail-page-setting'].data(serviceID).queryKey,
          () => {
            return newData;
          }
        );
      },
      [serviceID]
    );

    _return.current = {
      isPostDetailPageDataLoading,
      isPostDetailPageDataSuccess,
      postDetailPageData,
      setDetailPageData,
    };

    return _return.current;
  };
