'use client';

import { ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useConsultingAppState } from '@/features/dashboard/hooks/context/use-consultingapp-state';
import { toolbarMenuItems, viewOptions as toolbarViewOption } from '../constants/toolbar-menu-items';
import { ToolbarMenuItem, ToolbarViewOption } from '../types/toolbar-menu-item.type';
import { BoardType, ViewOption } from '@/features/dashboard/contexts/consultingapp-state-context';
import { IconButton } from '@mui/material';
import { useUser } from '@/features/auth/hooks/use-user';
import { AdminGroup } from '@/features/auth/types/user.type';

type ToolbarProps = {
  boardType: BoardType;
};
const Toolbar = ({ boardType }: ToolbarProps) => {
  const { viewOption, setViewOption } = useConsultingAppState();
  const { user } = useUser();
  const theme = useTheme();
  const upmd = useMediaQuery(theme.breakpoints.up('md'));

  const isAdmin = user?.groupIdList.includes(AdminGroup['ConsultingAdminDeveloper']);

  return (
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
      {renderMenuItems(toolbarMenuItems, upmd)}
      {isAdmin && boardType === 'all' && renderViewOptions(toolbarViewOption, upmd, viewOption, setViewOption)}
    </Stack>
  );
};

const renderMenuItems = (items: ToolbarMenuItem[], upmd: boolean) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { boardType, setBoardType, setViewOption } = useConsultingAppState();
  const children = items.reduce((acc: ReactNode[], curr: ToolbarMenuItem): ReactNode[] => {
    const { title, displayType, Icon } = curr;

    acc.push(
      <MenuItem
        key={displayType}
        title={title}
        displayType={displayType}
        boardType={boardType}
        setBoardType={setBoardType}
        setViewOption={setViewOption}
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
  setViewOption: (newOption: ViewOption) => void;
  upmd: boolean;
};
const MenuItem = ({ title, displayType, Icon, boardType, setBoardType, setViewOption, upmd }: MenuItemProps) => {
  const isActive = displayType === boardType;

  const handleClick = () => {
    if (!isActive) setBoardType(displayType);
    setViewOption('basic');
  };

  return (
    <Chip
      size="small"
      color={isActive ? 'info' : 'default'}
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

const renderViewOptions = (
  options: ToolbarViewOption[],
  upmd: boolean,
  viewOption: ViewOption,
  setViewOption: (newOption: ViewOption) => void
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { viewOption, setViewOption } = useConsultingAppState();

  const children = options.reduce((acc: ReactNode[], curr: ToolbarViewOption): ReactNode[] => {
    const { displayType, Icon } = curr;

    acc.push(
      <ViewOptions
        key={displayType}
        displayType={displayType}
        viewOption={viewOption}
        setViewOption={setViewOption}
        Icon={Icon}
        upmd={upmd}
      />
    );

    return acc;
  }, []);

  return (
    <Breadcrumbs separator="-" component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Breadcrumbs>
  );
};

type ViewOptionsProps = Pick<ToolbarViewOption, 'Icon' | 'displayType'> & {
  viewOption: ViewOption;
  setViewOption: (newViewOption: ViewOption) => void;
  upmd: boolean;
};
const ViewOptions = ({ displayType, Icon, viewOption, setViewOption, upmd }: ViewOptionsProps) => {
  const isActive = displayType === viewOption;

  const handleClick = () => {
    if (!isActive) setViewOption(displayType);
  };

  return (
    <IconButton
      onClick={handleClick}
      size="small"
      color={isActive ? 'info' : 'default'}
      sx={{ '& .MuiSvgIcon-root': { fontSize: 'small' } }}
    >
      <Icon />
    </IconButton>
  );
};

export default Toolbar;
