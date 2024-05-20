'use client';

import { useState, DragEvent, Fragment } from 'react';

import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { useConsultingFileSettings } from '@/features/dashboard/hooks/use-consulting-file-settings';
import EditFile from '../edit-file';
import DragSlot from '../drag-slot';

const FileListData = () => {
  const { files, setSelected } = useConsultingFileSettings();

  const handleDragStart = (event: DragEvent<HTMLTableRowElement>) => {
    const id = parseInt(event.currentTarget.id.replace('tableRow-', ''));
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
          <Fragment key={file.no}>
            <DraggableTableRow
              id={`tableRow-${file.no}`}
              draggable={files.length > 1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <EditFile file={file} />
            </DraggableTableRow>
            <DragSlot index={file.no} />
          </Fragment>
        );
      })}
    </>
  );
};

export default FileListData;
