'use client';

import { ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import WindowIcon from '@mui/icons-material/Window';
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
      {renderMenuItems(toolbarMenuItems)}
      {upmd && <Chip size="small" color="primary" icon={<AddIcon fontSize="small" />} label="새로 만들기" clickable />}
    </Stack>
  );
};

const renderMenuItems = (items: ToolbarMenuItem[]) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { boardType, setBoardType } = useConsultingAppState();
  const children = items.reduce((acc: ReactNode[], curr: ToolbarMenuItem): ReactNode[] => {
    const { title, displayType } = curr;

    acc.push(
      <MenuItem
        key={displayType}
        title={title}
        displayType={displayType}
        boardType={boardType}
        setBoardType={setBoardType}
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

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:focus': {
      transform: 'scale(1.05)',
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
    transition: 'transform 0.1s linear',
  };
}) as typeof Chip;

type MenuItemProps = ToolbarMenuItem & {
  boardType: BoardType;
  setBoardType: (newType: BoardType) => void;
};
const MenuItem = ({ title, displayType, boardType, setBoardType }: MenuItemProps) => {
  const isActive = displayType === boardType;

  const handleClick = () => {
    if (!isActive) setBoardType(displayType);
  };

  return <StyledBreadcrumb onClick={handleClick} label={title} icon={<WindowIcon fontSize="small" />} />;
};

export default Toolbar;
