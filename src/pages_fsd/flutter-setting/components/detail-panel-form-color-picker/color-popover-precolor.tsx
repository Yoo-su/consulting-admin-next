import { Box } from '@mui/material';
import { PRE_COLORS } from '../../constants';
import { PreColors } from '../../models';
import { ColorSquareIcon } from './color-square-icon';

type ColorPopoverPrecolorProps = {
  handlePrecolorChange: (color: PreColors) => void;
};

export const ColorPopoverPrecolor = ({ handlePrecolorChange }: ColorPopoverPrecolorProps) => {
  return (
    <Box>
      {PRE_COLORS.map((color, index) => (
        <ColorSquareIcon key={index} color={`#${color}`} onClick={() => handlePrecolorChange(color)} />
      ))}
    </Box>
  );
};
