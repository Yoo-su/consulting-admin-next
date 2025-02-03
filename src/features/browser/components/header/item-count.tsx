import Typography from '@mui/material/Typography';
import { memo } from 'react';

type ItemCountProps = {
  dataCnt: number;
};
export const ItemCount = memo(({ dataCnt }: ItemCountProps) => {
  return <Typography variant="body2" color="grey.700">{`${dataCnt}건`}</Typography>;
});
ItemCount.displayName = 'ItemCount';
