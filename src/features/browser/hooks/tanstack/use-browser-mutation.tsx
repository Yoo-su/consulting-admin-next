'use client';

import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import toast from 'react-hot-toast';

import { QUERY_KEYS } from '@/shared/constants';

import {
  deleteBrowserFile,
  renameBrowserFile,
  RenameBrowserFileProps,
} from '../../apis';
import { useBrowserStore } from '../../models';

type UseBrowserMutationReturn = {
  isRenameBrowserFileLoading: boolean;
  isDeleteBrowserFileLoading: boolean;
  deleteBrowserFile: (path: string) => Promise<void>;
  renameBrowserFile: ({
    oldName,
    newName,
  }: RenameBrowserFileProps) => Promise<void>;
};

type UseBrowserMutation = () => UseBrowserMutationReturn;

export const useBrowserMutation: UseBrowserMutation = () => {
  const queryClient = useQueryClient();
  const currentPath = useBrowserStore((state) => state.currentPath);

  const _return = useRef({} as UseBrowserMutationReturn);

  const {
    mutateAsync: mutateRenameBrowserFile,
    isPending: isRenameBrowserFileLoading,
  } = useMutation({
    mutationFn: ({ oldName, newName }: RenameBrowserFileProps) =>
      renameBrowserFile({ oldName, newName }),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: QUERY_KEYS.browser.data(currentPath).queryKey,
        })
        .then(() => {
          toast.success(
            <Typography variant="caption">
              성공적으로 변경되었습니다.
            </Typography>
          );
        });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const {
    mutateAsync: mutateDeleteBrowserFile,
    isPending: isDeleteBrowserFileLoading,
  } = useMutation({
    mutationFn: (path: string) => deleteBrowserFile(path),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.browser.data(currentPath).queryKey,
      });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  _return.current = {
    isDeleteBrowserFileLoading,
    isRenameBrowserFileLoading,
    deleteBrowserFile: mutateDeleteBrowserFile,
    renameBrowserFile: mutateRenameBrowserFile,
  };

  return _return.current;
};
