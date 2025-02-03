import SyncIcon from '@mui/icons-material/Sync';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCallback, useState } from 'react';

import { useConfirmToast, useTypographyToast } from '@/shared/hooks';

import { useSyncDetailpageDataMutation } from '../hooks';

type DetailPageDataDB = 'devDb' | 'testDb' | 'realDb' | '';
type SyncBoxProps = {
  serviceID: string;
};
export const SyncBox = ({ serviceID }: SyncBoxProps) => {
  const { showError, showSuccess } = useTypographyToast();
  const { mutateAsync, isPending } = useSyncDetailpageDataMutation();
  const { openConfirmToast } = useConfirmToast();
  const [source, setSource] = useState<DetailPageDataDB>('');
  const [target, setTarget] = useState<DetailPageDataDB>('');

  const handleChangeSource = useCallback((event: SelectChangeEvent) => {
    setSource(event.target.value as DetailPageDataDB);
  }, []);

  const handleChangeTarget = useCallback((event: SelectChangeEvent) => {
    setTarget(event.target.value as DetailPageDataDB);
  }, []);

  const handleSyncBtnClick = () => {
    if (!source || !target) return;
    openConfirmToast({
      message: `${source}의 내용을 ${target}으로 동기화하시겠습니까?`,
      callbackConfirm: () => {
        mutateAsync({
          serviceID: serviceID,
          sourceServerType: source,
          targetServerType: target,
        })
          .then(() => {
            showSuccess('동기화가 완료되었습니다');
          })
          .catch((err) => {
            showError('동기화 중 에러가 발생했습니다');
          });
      },
    });
  };

  return (
    <Stack direction={'row'} alignItems={'flex-end'} spacing={1}>
      <FormControl variant="standard" sx={{ minWidth: 100 }}>
        <InputLabel>Source</InputLabel>
        <Select size="medium" value={source} onChange={handleChangeSource} label="Source">
          <MenuItem value="devDb">DevDB</MenuItem>
          <MenuItem value="testDb">TestDB</MenuItem>
          <MenuItem value="realDb">RealDB</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ minWidth: 100 }}>
        <InputLabel>Target</InputLabel>
        <Select size="medium" value={target} onChange={handleChangeTarget} label="Target">
          <MenuItem value="devDb">DevDB</MenuItem>
          <MenuItem value="testDb">TestDB</MenuItem>
          <MenuItem value="realDb">RealDB</MenuItem>
        </Select>
      </FormControl>

      <LoadingButton
        size="large"
        variant="contained"
        color="info"
        startIcon={<SyncIcon fontSize="inherit" />}
        loading={isPending}
        disabled={!source || !target || source === target}
        onClick={handleSyncBtnClick}
      >
        <Typography variant="caption">동기화</Typography>
      </LoadingButton>
    </Stack>
  );
};
