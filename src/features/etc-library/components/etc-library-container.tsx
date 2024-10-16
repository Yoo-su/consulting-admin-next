'use client';

import { useCallback, DragEvent, Fragment } from 'react';
import { Alert, Stack, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';

import EmptyBox from '@/shared/components/ui/empty-box';
import ContentWrapper from '@/shared/components/ui/content-wrapper';
import ContentLoadingSkeleton from '@/shared/components/ui/loadings/skeleton';
import FileItemCard, { FileType } from '@/shared/components/ui/file-item-card';

import { useUnivService } from '@/shared/hooks/context';
import { useGetEtcLibrariesQuery, useHandleEtcLibrary } from '../hooks';
import { formatKoreanTextCompareDatesFromNow } from '@/shared/services';
import { useDownloadFile } from '@/shared/hooks';

const EtcLibraryContainer = () => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUniv, currentService } = useUnivService();
  const { data: libraries, isLoading } = useGetEtcLibrariesQuery(currentService?.serviceID);
  const { setFile, alertData } = useHandleEtcLibrary();
  const { downloadFile } = useDownloadFile();

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        const uploadFile = files[0];
        setFile(uploadFile);
      }
    },
    [setFile]
  );

  return (
    <ContentWrapper>
      {isLoading ? (
        <ContentLoadingSkeleton />
      ) : (
        <Fragment>
          <ContentWrapper.Header bottomDivider>
            <Typography
              variant="h6"
              sx={{
                ...(downmd && {
                  width: '75%',
                  fontSize: '16px',
                }),
              }}
            >{`${currentUniv?.univName}(${currentService?.serviceID}) 기타 자료 목록`}</Typography>
          </ContentWrapper.Header>
          <ContentWrapper.MainContent>
            <Stack direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'}>
              {!!libraries?.data?.length && (
                <Typography
                  variant="body1"
                  color="grey.600"
                  whiteSpace={'nowrap'}
                  sx={{
                    ...(downmd && {
                      fontSize: '14px',
                    }),
                  }}
                >
                  총 {libraries?.data.length}건
                </Typography>
              )}
            </Stack>

            {alertData?.message && (
              <Alert severity={alertData.color} color={alertData.color} sx={{ mt: 4, mx: 'auto', minWidth: '65%' }}>
                {alertData.message}
              </Alert>
            )}

            <Stack onDragOver={handleDragOver} onDrop={handleDrop}>
              {libraries?.data?.length ? (
                <Grid container spacing={3} sx={{ mt: 3 }}>
                  {libraries.data.map((library) => (
                    <Grid key={library.fileName} item xs={12} sm={6} md={6} lg={4} xl={3}>
                      <FileItemCard
                        tooltipMsg={library.fileName}
                        handleClick={() => downloadFile(library.url, library.fileName)}
                      >
                        <FileItemCard.IconBox file={(library.fileName.split('.')[1] as FileType) ?? 'none'} />

                        <FileItemCard.ContentBox>
                          <FileItemCard.TitleBox title={library.fileName} />

                          <FileItemCard.AdditionalInfo sxProps={{ justifyContent: 'space-between' }}>
                            <Typography variant="caption" color="grey.500" textAlign="right">
                              편집자: {library.modifyUser}
                            </Typography>
                            <Typography variant="caption" color="grey.500" textAlign="right">
                              {formatKoreanTextCompareDatesFromNow(library.uploadDate)}
                            </Typography>
                          </FileItemCard.AdditionalInfo>
                        </FileItemCard.ContentBox>
                      </FileItemCard>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <EmptyBox text="업로드된 자료가 없습니다" />
              )}
            </Stack>
          </ContentWrapper.MainContent>
        </Fragment>
      )}
    </ContentWrapper>
  );
};

export default EtcLibraryContainer;
