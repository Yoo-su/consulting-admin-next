import { Draggable } from '@hello-pangea/dnd';

import { ConsultingFile } from '../../models';
import { FileEdit } from '../table-body-list-edit';
import { TableRowBox } from '../table-customs';

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
              <FileEdit file={file} />
            </TableRowBox>
          )}
        </Draggable>
      ))}
    </>
  );
};
