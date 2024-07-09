import { Tooltip, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import { MouseEvent } from 'react';
import Image from 'next/image';
type SetAppTypeProps = {
  isNew: boolean[];
  index: number;
  onClick: (event: MouseEvent<HTMLSpanElement>, value: boolean) => void;
  isCurrent: boolean;
};

const SetAppType = ({ isNew, index, onClick, isCurrent }: SetAppTypeProps) => {
  return (
    <ToggleButtonGroup
      value={isNew[index]}
      exclusive
      onChange={isCurrent ? onClick : () => {}}
      size="small"
      sx={{
        ...ToggleButtonGroupClass,
        '& .MuiToggleButtonGroup-grouped': {
          cursor: isCurrent ? 'pointer' : 'not-allowed',
          border: '0px solid white',
        },
      }}
    >
      <Tooltip title={<Typography variant="caption">PWA(기존)</Typography>} placement="top">
        <ToggleButton
          value={false}
          id={index.toString()}
          sx={{ padding: '5px 0', filter: isNew[index] ? unselectedIconFilter : '' }}
        >
          <Image src="../pwa.svg" alt="pwa" width={40} height={25} />
        </ToggleButton>
      </Tooltip>
      <Tooltip title={<Typography variant="caption">플러터(신규)</Typography>} placement="top">
        <ToggleButton
          value={true}
          id={index.toString()}
          sx={{ padding: '9.5px 0', filter: isNew[index] ? '' : unselectedIconFilter }}
        >
          <Image src="../flutter.svg" alt="flutter" width={40} height={15} />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
};

export default SetAppType;

const ToggleButtonGroupClass = {
  '& .Mui-selected': {
    backgroundColor: 'transparent !important',
  },
};
const unselectedIconFilter = 'grayscale(1) opacity(.5)';
