import { EmptyCover } from '@/shared/components';
import { Stack } from '@mui/material';
import { EmptyCoverClass } from '../../constants/classes';

type EmptyListProps = {
  isShow: boolean;
};

export const EmptyList = ({ isShow }: EmptyListProps) => {
  if (!isShow) return null;
  return (
    <Stack sx={EmptyCoverClass}>
      <EmptyCover message={'예외 설정이 없습니다'} />
    </Stack>
  );
};
