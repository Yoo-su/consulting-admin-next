'use client';

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from '@hello-pangea/dnd';
import Box from '@mui/material/Box';

import { useConsultingFileSettings } from '../hooks';
import { EditFile } from './edit-file';
import { TableRowBox } from './table-components';
import { useCallback } from 'react';

export const FileListData = () => {
  const { files, updateRefNo } = useConsultingFileSettings();

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, type } = result;
      if (!destination) return;
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      )
        return;
      if (type === 'group') {
        updateRefNo(files, source.index + 1, destination.index + 1);
      }
    },
    [files, updateRefNo]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="ROOT" type="group">
        {(provided) => (
          <Box
            sx={{ width: '100%' }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <>
              {files.map((file, index) => (
                <Draggable
                  key={file.RefNo}
                  draggableId={`${file.RefNo}`}
                  index={index}
                >
                  {(provided) => (
                    <TableRowBox
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      innerRef={provided.innerRef}
                    >
                      <EditFile file={file} />
                    </TableRowBox>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
