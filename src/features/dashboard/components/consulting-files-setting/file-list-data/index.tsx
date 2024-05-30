'use client';

import { useConsultingFileSettings } from '@/features/dashboard/hooks/context/use-consulting-file-settings';
import EditFile from '../edit-file';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import Box from '@mui/material/Box';
import { TableRowBox } from '../table-components/table-boxes';
import { ConsultingFile } from '@/features/dashboard/types/consulting-file';

const FileListData = () => {
  const { files, setFiles, updateRefNo } = useConsultingFileSettings();

  const reorder = (list: ConsultingFile[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    if (type === 'group') {
      updateRefNo(source.index + 1, destination.index + 1);
      // 화면 용 변경
      const newFiles = reorder(files, source.index, destination.index);
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
