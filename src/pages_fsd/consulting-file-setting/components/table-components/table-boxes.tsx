'use client';

import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from '@hello-pangea/dnd';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ComponentPropsWithoutRef, PropsWithChildren, Ref } from 'react';

import {
  CustomWidthBoxCellStyle,
  TableBoxStyle,
  TableContainerBoxStyle,
  TableRowBoxStyle,
} from '../../constants';

export const TableContainerBox = ({ children }: PropsWithChildren) => {
  return <Box sx={{ ...TableContainerBoxStyle }}>{children}</Box>;
};

export const TableBox = ({ children }: PropsWithChildren) => {
  return <Box sx={{ ...TableBoxStyle }}>{children}</Box>;
};

type TableRowBoxProps = PropsWithChildren & {
  innerRef?: Ref<unknown> | undefined;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
};
export const TableRowBox = ({
  children,
  innerRef,
  draggableProps,
  dragHandleProps,
}: TableRowBoxProps) => {
  return (
    <Box
      sx={{ ...TableRowBoxStyle }}
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
    >
      {children}
    </Box>
  );
};

type CustomWidthBoxCellProps = PropsWithChildren & {
  size?: 'xs' | 's' | 'm' | 'l';
  typo?: boolean;
  justifyContent?:
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'flex-start'
    | 'flex-end';
} & ComponentPropsWithoutRef<'div'>;

const SIZE_MAPPINGS = {
  xs: '14px',
  s: '5%',
  m: '50%',
  l: '100%',
} as const;

export const CustomWidthBoxCell = ({
  children = null,
  size = 'l',
  typo = false,
  justifyContent = 'flex-start',
  ...rest
}: CustomWidthBoxCellProps) => {
  const width = SIZE_MAPPINGS[size];
  return (
    <Box sx={{ ...CustomWidthBoxCellStyle, width, justifyContent }} {...rest}>
      {typo ? <Typography>{children}</Typography> : <>{children}</>}
    </Box>
  );
};
