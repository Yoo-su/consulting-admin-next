'use client';

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import Box from '@mui/material/Box';
import { useCallback } from 'react';

import { useConsultingFileSettings } from '../../hooks';
import { FileListRow } from '.';

export const FileListData = () => {
  const { files, updateRefNo } = useConsultingFileSettings();

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, type } = result;
      if (!destination) return;
      if (source.droppableId === destination.droppableId && source.index === destination.index) return;
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
          <Box sx={{ width: '100%' }} {...provided.droppableProps} ref={provided.innerRef}>
            <>
              <FileListRow files={files} />
              {provided.placeholder}
            </>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
