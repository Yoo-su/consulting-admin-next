import CheckIcon from '@mui/icons-material/Check';
import { Chip, TableBody, TableCell, TableRow, Typography } from '@mui/material';

import { STATE_BOARD_DOMAIN_ITEMS } from '@/pages_fsd/overview/constants';
import { ConsultingAppState } from '@/pages_fsd/overview/models';
import { useGetUnivListQuery } from '@/shared/hooks';

type TableBoardBodyProps = {
  visibleRows: ConsultingAppState[];
};
export const TableBoardBody = ({ visibleRows }: TableBoardBodyProps) => {
  const { data: univList } = useGetUnivListQuery();
  return (
    <TableBody>
      {visibleRows.map((item: ConsultingAppState) => {
        const { color, title } = STATE_BOARD_DOMAIN_ITEMS[item.currentState];
        const currentUniv = univList?.find((univ) => univ.univID === item.univID);
        const univName = currentUniv?.univName || '새대학';

        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={univName}>
            <TableCell>{univName}</TableCell>
            <TableCell align="right">{item.serviceID}</TableCell>
            <TableCell align="right">{item.developerName}</TableCell>
            <TableCell align="right">{item.managerName}</TableCell>
            <TableCell align="right">
              <Chip
                size="small"
                label={
                  <Typography variant="caption" color="grey.800">
                    {title}
                  </Typography>
                }
                sx={{ bgcolor: color }}
              />
            </TableCell>
            <TableCell align="right">{item.isNew && <CheckIcon sx={{ color: '#1976D2' }} />}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};
