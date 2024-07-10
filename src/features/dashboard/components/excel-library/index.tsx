'use client';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import ExcelItem from './excel-item';
import ContentLoadingSkeleton from '@/shared/components/loadings/skeleton';
import { useUnivService } from '@/features/dashboard/hooks/context/use-univ-service';
import { useGetFoundationLibrariesQuery } from '../../hooks/tanstack/use-get-foudation-libraries-query';
import ContentWrapper from '@/shared/components/content-wrapper';
import EmptyBox from '@/shared/components/empty-box';

const FoundationLibraryListBox = () => {
  const theme = useTheme();
  const downmd = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUniv, currentService } = useUnivService();
  const { data: libraries, isLoading } = useGetFoundationLibrariesQuery(currentService?.serviceID);

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
                    <ExcelItem item={library} />
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

export default FoundationLibraryListBox;
