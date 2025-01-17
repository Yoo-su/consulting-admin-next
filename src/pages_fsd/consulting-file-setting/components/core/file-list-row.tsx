import { Draggable } from '@hello-pangea/dnd';

import { ConsultingFile } from '../../models';
import { TableRowBox } from '../elements';
import { EditFile } from './edit-file';

type FileListRowProps = {
  files: ConsultingFile[];
};

export const FileListRow = ({ files }: FileListRowProps) => {
  return (
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
    </>
  );
};
