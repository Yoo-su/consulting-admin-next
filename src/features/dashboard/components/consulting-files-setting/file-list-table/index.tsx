import Stack from '@mui/material/Stack';
import FileUploader from '../file-uploader';
import FileListData from '../file-list-data';
import { TableContainerBox, TableBox, TableRowBox, CustomWidthBoxCell } from '../table-components/table-boxes';

const FileListTable = () => {
  return (
    <Stack direction={'column'} sx={{ mt: 5 }}>
      <TableContainerBox aria-label="file-list-table">
        <TableBox>
          <TableRowBox>
            <CustomWidthBoxCell size="xs" />
            <CustomWidthBoxCell typo={true} size="s">
              순서
            </CustomWidthBoxCell>
            <CustomWidthBoxCell typo={true} size="m">
              자료명
            </CustomWidthBoxCell>
            <CustomWidthBoxCell typo={true} size="m">
              파일명
            </CustomWidthBoxCell>
            <CustomWidthBoxCell size="s">삭제</CustomWidthBoxCell>
          </TableRowBox>
          <TableRowBox>
            <FileListData />
          </TableRowBox>
          <TableRowBox>
            <FileUploader />
          </TableRowBox>
        </TableBox>
      </TableContainerBox>
    </Stack>
  );
};

export default FileListTable;
