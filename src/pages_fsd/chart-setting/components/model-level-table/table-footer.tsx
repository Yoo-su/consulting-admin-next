import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Stack, styled, TableCell, TableFooter, TableRow, Typography } from '@mui/material';
import { memo } from 'react';

import { ADD_ROW_TEXT } from '../../constants';

type LevelTableFooterProps = {
  handleAddLevelRow: () => void;
};
export const LevelTableFooter = memo(({ handleAddLevelRow }: LevelTableFooterProps) => {
  return (
    <TableFooter>
      <TableRow>
        <TableCell align="center" colSpan={4}>
          <AddRowBox onClick={handleAddLevelRow}>
            <AddRowStack direction={'row'}>
              <AddCircleIcon sx={{ color: '#0069A0', marginRight: 1 }} />
              <Typography variant="body2" sx={{ color: '#0069A0' }}>
                {ADD_ROW_TEXT}
              </Typography>
            </AddRowStack>
          </AddRowBox>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
});
LevelTableFooter.displayName = 'LevelTableFooter';

const AddRowBox = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  ':hover': {
    backgroundColor: theme.palette.action.hover,
  },
  transition: 'background-color 0.1s ease',
  borderRadius: theme.shape.borderRadius,
}));

const AddRowStack = styled(Stack)(({ theme }) => ({
  padding: '0.5rem 0',
  justifyContent: 'center',
  alignItems: 'center',
}));
