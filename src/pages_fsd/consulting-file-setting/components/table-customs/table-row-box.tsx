'use client';

import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import Box from '@mui/material/Box';
import { PropsWithChildren, Ref } from 'react';

import { TableRowBoxStyle } from '../../constants';

type TableRowBoxProps = PropsWithChildren & {
  innerRef?: Ref<unknown> | undefined;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
};
export const TableRowBox = ({ children, innerRef, draggableProps, dragHandleProps }: TableRowBoxProps) => {
  return (
    <Box sx={TableRowBoxStyle} ref={innerRef} {...draggableProps} {...dragHandleProps}>
      {children}
    </Box>
  );
};
