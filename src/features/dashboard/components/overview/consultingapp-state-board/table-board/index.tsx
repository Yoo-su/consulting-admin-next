'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import CheckIcon from '@mui/icons-material/Check';

import { useConsultingAppState } from '@/features/dashboard/hooks/use-consultingapp-state';
import { stateBoardDomainItems } from '../constants/state-board-domain-items';

const TableBoard = () => {
  const { consultingAppStates, setConsultingAppStates } = useConsultingAppState();

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>대학명</TableCell>
              <TableCell align="right">서비스ID</TableCell>
              <TableCell align="right">담당 개발자</TableCell>
              <TableCell align="right">담당 운영자</TableCell>
              <TableCell align="right">현재 상태</TableCell>
              <TableCell align="right">신규앱 여부</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {consultingAppStates.map((item) => {
              const { color, title } = stateBoardDomainItems[item.currentState];
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={item.serviceID}>
                  <TableCell component="th" scope="row">
                    {item.univName}
                  </TableCell>
                  <TableCell align="right">{item.serviceID}</TableCell>
                  <TableCell align="right">{item.developer}</TableCell>
                  <TableCell align="right">{item.manager}</TableCell>
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
                  <TableCell align="right">{item.isNew ? <CheckIcon sx={{ color: '#1976D2' }} /> : null}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableBoard;
