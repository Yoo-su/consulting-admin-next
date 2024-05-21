import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/material';
import { useState, DragEvent } from 'react';
import { useConsultingFileSettings } from '@/features/dashboard/hooks/use-consulting-file-settings';

const DragSlot = ({ index }: { index: number }) => {
  const { selected, files, setFiles } = useConsultingFileSettings();
  const [isDragging, setIsDragging] = useState(false);

  const isNotBetweenSelected = () => {
    return selected != null && (index > selected || index < selected - 1);
  };

  const handleDragEnter = (e: DragEvent<HTMLTableCellElement>) => {
    e.preventDefault();
    setIsDragging(isNotBetweenSelected);
  };
  const handleDragLeave = (e: DragEvent<HTMLTableCellElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: DragEvent<HTMLTableCellElement>) => {
    if (selected === null || selected === undefined) return;

    const selectedFile = files[selected - 1];
    const newFiles = files.filter((file) => file.RefNo !== selected);

    newFiles.splice(index, 0, selectedFile);
    setFiles(newFiles.map((file, index) => ({ ...file, refNo: index + 1 })));
    // TODO: update api와 연결하기
    setIsDragging(false);
  };
  const handleDragOver = (e: DragEvent<HTMLTableCellElement>) => {
    e.preventDefault();
  };

  const TableRowSlot = styled(TableRow)({
    padding: '0px',
    height: '0px',
    borderTop: '1px solid white',
    borderBottom: '1px solid #E0E0E0',
    borderColor: isDragging ? '#E5F6FD' : 'E0E0E0',
  });

  const TableCellSlot = styled(TableCell)({
    padding: '0px',
    backgroundColor: '#E5F6FD',
    height: isDragging ? '20px' : '0px',
  });
  return (
    <>
      <TableRowSlot>
        <TableCellSlot
          colSpan={5}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
      </TableRowSlot>
    </>
  );
};

export default DragSlot;
