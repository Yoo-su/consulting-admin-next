import { CellBoxCustomWidth, TableRowBox } from '../table-customs';
import { HeaderDeleteAll } from './header-delete-all';

export const TableHeader = () => {
  return (
    <TableRowBox>
      <CellBoxCustomWidth size="xs" style={{ width: '8px' }} />
      <CellBoxCustomWidth typo={true} size="s">
        순서
      </CellBoxCustomWidth>
      <CellBoxCustomWidth typo={true} size="m">
        자료명
      </CellBoxCustomWidth>
      <CellBoxCustomWidth typo={true} size="m">
        파일명
      </CellBoxCustomWidth>
      <CellBoxCustomWidth typo={true} size="s" style={{ paddingRight: 0 }}>
        삭제
      </CellBoxCustomWidth>
      <CellBoxCustomWidth size="xs" style={{ paddingLeft: 0 }}>
        <HeaderDeleteAll />
      </CellBoxCustomWidth>
    </TableRowBox>
  );
};
