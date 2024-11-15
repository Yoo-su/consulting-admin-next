import { Grid, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { KeyboardEvent, memo, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useShallow } from 'zustand/shallow';

import { QUERY_KEYS } from '@/shared/constants';
import {
  useDeleteBrowserFileMutation,
  useRenameBrowserFileMutation,
} from '@/shared/hooks/tanstack';
import { BrowserItem } from '@/shared/models';
import { useBrowserStore } from '@/shared/models/stores';

import BrowserFolder from '../atoms/browser-directory';
import BrowserFile from '../atoms/browser-file';
import FileIcon from '../atoms/file-icon';

type FileListProps = {
  browsedList: BrowserItem[];
};
const FileList = ({ browsedList }: FileListProps) => {
  const queryClient = useQueryClient();
  const { currentPath, setCurrentPath } = useBrowserStore(
    useShallow((state) => ({
      currentPath: state.currentPath,
      setCurrentPath: state.setCurrentPath,
    }))
  );
  const { mutateAsync: renameFile } = useRenameBrowserFileMutation();
  const { mutateAsync: deleteFile } = useDeleteBrowserFileMutation();

  // 폴더 아이콘 클릭 처리
  const handleClickDirectory = useCallback(
    (folder: BrowserItem) => {
      const newPath = currentPath + '/' + folder.name;
      setCurrentPath(newPath);
    },
    [currentPath]
  );

  // 파일 이름 변경 처리
  const handleRenameFile = useCallback(
    async (
      event: KeyboardEvent<HTMLInputElement>,
      oldName: string,
      newName: string
    ) => {
      if (event.key === 'Enter') {
        toast
          .promise(renameFile({ oldName, newName }), {
            loading: (
              <Typography variant="caption">
                파일명을 변경중입니다...
              </Typography>
            ),
            success: (
              <Typography variant="caption">
                성공적으로 변경되었습니다.
              </Typography>
            ),
            error: (
              <Typography variant="caption">
                변경중 에러가 발생했습니다.
              </Typography>
            ),
          })
          .finally(() => {
            queryClient.invalidateQueries({
              queryKey: QUERY_KEYS.browser.data(currentPath).queryKey,
            });
          });
      }
    },
    [queryClient, currentPath]
  );

  const handleDeleteFile = useCallback(
    async (filePath: string) => {
      toast
        .promise(deleteFile(filePath), {
          loading: (
            <Typography variant="caption">파일을 삭제중입니다...</Typography>
          ),
          success: (
            <Typography variant="caption">
              성공적으로 삭제되었습니다.
            </Typography>
          ),
          error: (
            <Typography variant="caption">
              삭제중 에러가 발생했습니다.
            </Typography>
          ),
        })
        .finally(() => {
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.browser.data(currentPath).queryKey,
          });
        });
    },
    [queryClient, currentPath]
  );

  return browsedList.map((browserItem) =>
    browserItem.isDirectory ? (
      <Grid
        item
        display="flex"
        key={browserItem.name}
        justifyContent="center"
        alignItems="center"
        height="fit-content"
        sx={{ userSelect: 'none' }}
        xs={3}
        md={2}
        lg={1.2}
        xl={1}
      >
        <BrowserFolder
          browserItem={browserItem}
          handleClickDirectory={handleClickDirectory}
        />
      </Grid>
    ) : (
      <Grid
        item
        display="flex"
        key={browserItem.name}
        justifyContent="center"
        alignItems="center"
        height="fit-content"
        sx={{ userSelect: 'none' }}
        xs={3}
        md={2}
        lg={1.2}
        xl={1}
      >
        <BrowserFile
          {...browserItem}
          imageChildren={
            <FileIcon contentType={browserItem.contentType ?? ''} />
          }
          handleRenameFile={handleRenameFile}
          handleDeleteFile={handleDeleteFile}
        />
      </Grid>
    )
  );
};

export default memo(FileList);
