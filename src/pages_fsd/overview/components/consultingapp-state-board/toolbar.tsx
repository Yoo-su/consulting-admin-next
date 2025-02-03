'use client';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactNode } from 'react';

import { toolbarMenuItems, viewOptions as toolbarViewOption } from '../../constants';
import { BoardType, ToolbarMenuItem, ToolbarViewOption, useStatusBoardStore, ViewOption } from '../../models';

type ToolbarProps = {
  boardType: BoardType;
};
export const Toolbar = ({ boardType }: ToolbarProps) => {
  const { viewOption, setViewOption } = useStatusBoardStore();
  const theme = useTheme();
  const upmd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
      {renderMenuItems(toolbarMenuItems, upmd)}
      {renderViewOptions(toolbarViewOption, boardType, viewOption, setViewOption)}
    </Stack>
  );
};

const renderMenuItems = (items: ToolbarMenuItem[], upmd: boolean) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { boardType, setBoardType, setViewOption } = useStatusBoardStore();
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
  boardType: BoardType,
  viewOption: ViewOption,
  setViewOption: (newOption: ViewOption) => void
) => {
  const children = options.reduce((acc: ReactNode[], curr: ToolbarViewOption): ReactNode[] => {
    const { displayType, Icon } = curr;

    acc.push(
      <ViewOptions
        key={displayType}
        displayType={displayType}
        viewOption={viewOption}
        setViewOption={setViewOption}
        Icon={Icon}
        isDisabled={boardType !== 'all'}
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
  isDisabled: boolean;
};
const ViewOptions = ({ displayType, Icon, viewOption, setViewOption, isDisabled }: ViewOptionsProps) => {
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
      disabled={isDisabled}
    >
      <Icon />
    </IconButton>
  );
};
