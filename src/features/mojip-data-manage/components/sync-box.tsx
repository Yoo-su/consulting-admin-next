import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';

import SyncIcon from '@mui/icons-material/Sync';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSyncDetailpageDataMutation } from '../hooks';
import { useConfirmToast } from '@/shared/hooks';

type DetailPageDataDB = 'devDb' | 'testDb' | 'realDb' | '';
type SyncBoxProps = {
  serviceID: string;
};
const SyncBox = ({ serviceID }: SyncBoxProps) => {
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
    openConfirmToast(`${source}의 내용을 ${target}으로 동기화하시겠습니까?`, () => {
      mutateAsync({ serviceID: serviceID, sourceServerType: source, targetServerType: target })
        .then(() => {
          toast.success(<Typography variant="body2">동기화가 완료되었습니다</Typography>);
        })
        .catch((err) => {
          toast.error(<Typography variant="body2">동기화 중 에러가 발생했습니다</Typography>);
        });
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

export default SyncBox;
