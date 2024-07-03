'use client';

import { Fragment, useCallback, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import SaveDataButton from '@/shared/components/save-data-button';
import ContentWrapper from '@/shared/components/content-wrapper';
import { useUnivService } from '../../hooks/context/use-univ-service';
import MojipAccordion from './mojip-accordion';
import ContentLoadingSkeleton from '@/shared/components/loadings/skeleton';
import EmptyBox from '@/shared/components/empty-box';
import { useMojipSetting } from '../../hooks/context/use-mojip-setting';
import { useUpdateDetailpageDataMutation } from '../../hooks/tanstack/use-update-detail-pate-data-mutation';
import toast from 'react-hot-toast';

const MojipSettingBox = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const { currentService, currentUniv } = useUnivService();
  const { detailpageData, isPending, hasChanges, addNewDetailpageRow, syncDetailpageData } = useMojipSetting();
  const { mutateAsync } = useUpdateDetailpageDataMutation();

  const handleChangeSelected = useCallback((selectedRow: number | null) => {
    setSelected(selectedRow);
  }, []);

  const handleSaveDataBtnClick = () => {
    toast.promise(
      mutateAsync({ serviceID: currentService?.serviceID ?? '', detailpageData: detailpageData! }).then(() => {
        syncDetailpageData();
      }),
      {
        loading: <Typography variant="body2">모집요강 정보를 업데이트하는 중입니다...</Typography>,
        success: <Typography variant="body2">모집요강정보 업데이트 완료!</Typography>,
        error: <Typography variant="body2">모집요강정보 업데이트 중 문제가 발생했습니다</Typography>,
      }
    );
  };

  useEffect(() => {
    setSelected(null);
  }, [currentService]);

  return (
    <ContentWrapper>
      {isPending ? (
        <ContentLoadingSkeleton />
      ) : (
        <Fragment>
          <Stack width={'100%'} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography
              variant="h6"
              textAlign={'left'}
              width={'100%'}
            >{`${currentUniv?.univName}(${currentService?.serviceID}) 모집요강 설정`}</Typography>
            <Chip
              color="info"
              size="small"
              icon={<AddCircleIcon fontSize="inherit" />}
              label={<Typography variant="button">모집요강 추가</Typography>}
              clickable
              onClick={addNewDetailpageRow}
            />
          </Stack>

          {detailpageData?.length ? (
            <Stack direction={'column'} alignItems={'flex-start'} sx={{ mt: 4, width: '100%' }} spacing={5}>
              <Stack direction={'column'} width={'100%'}>
                {detailpageData?.map((item) => (
                  <MojipAccordion
                    serviceID={currentService?.serviceID ?? ''}
                    key={item.serviceID + '-detailpage-data-row-num-' + item.rowNum}
                    selectedRowNum={selected}
                    handleSelectRow={handleChangeSelected}
                    detailpageData={item}
                  />
                ))}
              </Stack>
            </Stack>
          ) : (
            <EmptyBox text={'상세페이지 데이터가 존재하지 않습니다'} />
          )}
        </Fragment>
      )}
      {hasChanges && <SaveDataButton handleBtnClick={handleSaveDataBtnClick} />}
    </ContentWrapper>
  );
};

export default MojipSettingBox;
