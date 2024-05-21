'use client';

import { DragEvent, Fragment } from 'react';

import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { useConsultingFileSettings } from '@/features/dashboard/hooks/use-consulting-file-settings';
import EditFile from '../edit-file';
import DragSlot from '../drag-slot';
import { getFileNoFromEvent } from '@/features/dashboard/services/get-replaced-string';

const FileListData = () => {
  const { files, setSelected } = useConsultingFileSettings();

  const handleDragStart = (event: DragEvent<HTMLTableRowElement>) => {
    const id = getFileNoFromEvent(event.currentTarget.id);
    setSelected(id);
  };
  const handleDragEnd = () => {
    setSelected(null);
  };

  const DraggableTableRow = styled(TableRow)({
    padding: '0px',
    '&:active': {
      backgroundColor: '#fafafa',
    },
  });

  return (
    <>
      <DragSlot index={0} />
      {files.map((file) => {
        return (
          <Fragment key={file.RefNo}>
            <DraggableTableRow
              id={`tableRow-${file.RefNo}`}
              draggable={files.length > 1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <EditFile file={file} />
            </DraggableTableRow>
            <DragSlot index={file.RefNo} />
          </Fragment>
        );
      })}
    </>
  );
};

export default FileListData;
