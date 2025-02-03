import SquareIcon from '@mui/icons-material/Square';
import { MouseEvent } from 'react';

type ColorSquareIconProps = {
  color: string;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
};

export const ColorSquareIcon = ({
  color,
  onClick = () => {},
}: ColorSquareIconProps) => {
  return (
    <SquareIcon
      sx={{
        color: color,
        height: 30,
        width: 30,
        padding: 0,
      }}
      onClick={onClick}
    />
  );
};
