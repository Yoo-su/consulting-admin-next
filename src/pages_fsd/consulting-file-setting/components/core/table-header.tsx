import { CustomWidthBoxCell, FileDeleteAll, TableRowBox } from '../elements';

export const TableHeader = () => {
  return (
    <TableRowBox>
      <CustomWidthBoxCell size="xs" style={{ width: '8px' }} />
      <CustomWidthBoxCell typo={true} size="s">
        순서
      </CustomWidthBoxCell>
      <CustomWidthBoxCell typo={true} size="m">
        자료명
      </CustomWidthBoxCell>
      <CustomWidthBoxCell typo={true} size="m">
        파일명
      </CustomWidthBoxCell>
      <CustomWidthBoxCell typo={true} size="s" style={{ paddingRight: 0 }}>
        삭제
      </CustomWidthBoxCell>
      <CustomWidthBoxCell size="xs" style={{ paddingLeft: 0 }}>
        <FileDeleteAll />
      </CustomWidthBoxCell>
    </TableRowBox>
  );
};
