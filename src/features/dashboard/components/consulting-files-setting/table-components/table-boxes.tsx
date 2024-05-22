import { ReactNode, Ref } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';

const TableContainerBoxStyle = {
  backgroundColor: 'var(--mui-palette-background-paper)',
  color: 'var(--mui-palette-text-primary)',
  WebkitTransition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  borderRadius: '4px',
  boxShadow: 'var(--mui-shadows-1)',
  backgroundImage: 'var(--mui-overlays-1)',
  width: '100%',
  overflowX: 'auto',
};
const TableBoxStyle = {
  display: 'table',
  width: '100%',
  borderCollapse: 'collapse',
  borderSpacing: '0',
};
const TableRowBoxStyle = {
  color: 'inherit',
  display: 'flex',
  verticalAlign: 'middle',
  justifyContent: 'space-between',
  outline: '0',
  width: '100%',
  backgroundColor: 'var(--mui-palette-background-paper)',
};
export const TableContainerBox = ({ children }: { children: ReactNode }) => {
  return <Box sx={{ ...TableContainerBoxStyle }}>{children}</Box>;
};

export const TableBox = ({ children }: { children: ReactNode }) => {
  return <Box sx={{ ...TableBoxStyle }}>{children}</Box>;
};

type TableRowBoxProps = {
  children: ReactNode;
  innerRef?: Ref<unknown> | undefined;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
};
export const TableRowBox = ({ children, innerRef, draggableProps, dragHandleProps }: TableRowBoxProps) => {
  return (
    <Box sx={{ ...TableRowBoxStyle }} ref={innerRef} {...draggableProps} {...dragHandleProps}>
      {children}
    </Box>
  );
};

type CustomWidthBoxCellProps = {
  children?: ReactNode;
  size?: 'xs' | 's' | 'm' | 'l';
  typo?: boolean;
  justifyContent?: 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'flex-start' | 'flex-end';
};
const customWidthBoxCellStyle = {
  padding: '16px',
  display: 'flex',
  alignItems: 'center',
  fontWeight: '400',
  fontSize: '0.875rem',
  lineHeight: '1.43',
  letterSpacing: '0.01071em',
  verticalAlign: 'inherit',
  borderBottom: '1px solid var(--mui-palette-TableCell-border)',
  color: 'var(--mui-palette-text-primary)',
};
export const CustomWidthBoxCell = ({
  children = null,
  size = 'l',
  typo = false,
  justifyContent = 'flex-start',
}: CustomWidthBoxCellProps) => {
  const width = size === 'xs' ? '16px' : size === 's' ? '8%' : size === 'm' ? '50%' : '100%';
  return (
    <Box sx={{ ...customWidthBoxCellStyle, width, justifyContent }}>
      {typo ? <Typography>{children}</Typography> : <>{children}</>}
    </Box>
  );
};
