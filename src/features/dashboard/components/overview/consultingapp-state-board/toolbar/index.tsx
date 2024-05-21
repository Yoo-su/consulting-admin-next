'use client';

import { ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useConsultingAppState } from '@/features/dashboard/hooks/use-consultingapp-state';
import { toolbarMenuItems } from '../constants/toolbar-menu-items';
import { ToolbarMenuItem } from '../types/toolbar-menu-item.type';
import { BoardType } from '@/features/dashboard/contexts/consultingapp-state-context';

const Toolbar = () => {
  const theme = useTheme();
  const upmd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
      {renderMenuItems(toolbarMenuItems, upmd)}
      {upmd && <Chip size="small" color="primary" icon={<AddIcon fontSize="small" />} label="새로 만들기" clickable />}
    </Stack>
  );
};

const renderMenuItems = (items: ToolbarMenuItem[], upmd: boolean) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { boardType, setBoardType } = useConsultingAppState();
  const children = items.reduce((acc: ReactNode[], curr: ToolbarMenuItem): ReactNode[] => {
    const { title, displayType, Icon } = curr;

    acc.push(
      <MenuItem
        key={displayType}
        title={title}
        displayType={displayType}
        boardType={boardType}
        setBoardType={setBoardType}
        Icon={Icon}
        upmd={upmd}
      />
    );

    return acc;
  }, []);

  return (
    <Breadcrumbs component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Breadcrumbs>
  );
};

type MenuItemProps = ToolbarMenuItem & {
  boardType: BoardType;
  setBoardType: (newType: BoardType) => void;
  upmd: boolean;
};
const MenuItem = ({ title, displayType, Icon, boardType, setBoardType, upmd }: MenuItemProps) => {
  const isActive = displayType === boardType;

  const handleClick = () => {
    if (!isActive) setBoardType(displayType);
  };

  return (
    <Chip
      size="small"
      color={displayType === boardType ? 'info' : 'default'}
      onClick={handleClick}
      label={
        upmd ? (
          <Typography variant="caption">{title}</Typography>
        ) : (
          <Typography variant="caption">{title.split(' ')[0]}</Typography>
        )
      }
      icon={<Icon />}
      sx={{ display: 'flex', alignItems: 'center' }}
    />
  );
};

export default Toolbar;
