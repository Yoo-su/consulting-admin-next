'use client';

import { useConsultingFileSettings } from '@/features/dashboard/hooks/use-consulting-file-settings';
import EditFile from '../edit-file';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import Box from '@mui/material/Box';
import { TableRowBox } from '../table-components/table-boxes';

const FileListData = () => {
  const { files, setFiles } = useConsultingFileSettings();
  console.log('files', files);

  const handleDragEnd = (result: DropResult) => {
    console.log('result', result);
    const { source, destination, type } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    if (type === 'group') {
      let newFiles = [...files];
      const [removed] = newFiles.splice(source.index, 1);
      newFiles.splice(destination.index, 0, removed);
      newFiles = newFiles.map((file, index) => ({ ...file, RefNo: index + 1 }));
      setFiles(newFiles);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="ROOT" type="group">
        {(provided) => (
          <Box sx={{ width: '100%' }} {...provided.droppableProps} ref={provided.innerRef}>
            <>
              {files.map((file, index) => (
                <Draggable key={file.RefNo} draggableId={`${file.RefNo}`} index={index}>
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

export default FileListData;
