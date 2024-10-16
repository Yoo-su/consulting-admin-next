'use client';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import FileItemCard from '@/shared/components/ui/file-item-card';
import ContentLoadingSkeleton from '@/shared/components/ui/loadings/skeleton';
import ContentWrapper from '@/shared/components/ui/content-wrapper';
import EmptyBox from '@/shared/components/ui/empty-box';

import { useUnivService } from '@/shared/hooks/context';
import { useGetFoundationLibrariesQuery } from '../hooks';
import { formatKoreanTextCompareDatesFromNow } from '@/shared/services';
import { useDownloadFile } from '@/shared/hooks';

const FoundationLibraryContainer = () => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUniv, currentService } = useUnivService();
  const { data: libraries, isLoading } = useGetFoundationLibrariesQuery(currentService?.serviceID);
  const { downloadFile } = useDownloadFile();

  return (
    <ContentWrapper>
      {isLoading ? (
        <ContentLoadingSkeleton />
      ) : (
        <>
          <ContentWrapper.Header bottomDivider>
            <Stack direction={'row'} alignItems={'flex-start'} width={'100%'}>
              <Typography
                variant="h6"
                textAlign={'left'}
                sx={{
                  flexGrow: 1,
                  ...(downmd && {
                    fontSize: '16px',
                  }),
                }}
              >{`${currentUniv?.univName}(${currentService?.serviceID}) 기초데이터 엑셀 목록`}</Typography>

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
          </ContentWrapper.Header>
          <ContentWrapper.MainContent>
            {libraries?.data?.length ? (
              <Grid container spacing={3} sx={{ mt: 3 }}>
                {libraries.data.map((library) => (
                  <Grid key={library.fileName} item xs={12} sm={6} md={6} lg={4} xl={3}>
                    <FileItemCard
                      tooltipMsg={library.fileName}
                      handleClick={() => downloadFile(library.url, library.fileName)}
                    >
                      <FileItemCard.IconBox file={'excel'} />

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
              <EmptyBox text="업로드된 엑셀이 없습니다" />
            )}
          </ContentWrapper.MainContent>
        </>
      )}
    </ContentWrapper>
  );
};

export default FoundationLibraryContainer;
