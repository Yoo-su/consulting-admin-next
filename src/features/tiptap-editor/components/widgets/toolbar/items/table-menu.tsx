'use client';

import { Fade, Menu, MenuItem, Typography } from '@mui/material';
import { Editor } from '@tiptap/react';

type IOption = {
  label: string;
  action: () => void;
};
const getTableMenus = (editor: Editor): IOption[] => [
  {
    label: '테이블 추가',
    action: () =>
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run(),
  },
  {
    label: '이전 열 추가',
    action: () => editor.chain().focus().addColumnBefore().run(),
  },
  {
    label: '다음 열 추가',
    action: () => editor.chain().focus().addColumnAfter().run(),
  },
  {
    label: '열 삭제',
    action: () => editor.chain().focus().deleteColumn().run(),
  },
  {
    label: '이전 행 추가',
    action: () => editor.chain().focus().addRowBefore().run(),
  },
  {
    label: '다음 행 추가',
    action: () => editor.chain().focus().addRowAfter().run(),
  },
  {
    label: '행 삭제',
    action: () => editor.chain().focus().deleteRow().run(),
  },
  {
    label: '테이블 삭제',
    action: () => editor.chain().focus().deleteTable().run(),
  },
  {
    label: '셀 병합',
    action: () => editor.chain().focus().mergeCells().run(),
  },
  {
    label: '헤더 열 토글',
    action: () => editor.chain().focus().toggleHeaderColumn().run(),
  },
  {
    label: '헤더 행 토글',
    action: () => editor.chain().focus().toggleHeaderRow().run(),
  },
  {
    label: '헤더 셀 토글',
    action: () => editor.chain().focus().toggleHeaderCell().run(),
  },
  {
    label: '병합 / 분할',
    action: () => editor.chain().focus().mergeOrSplit().run(),
  },
  {
    label: '셀 속성 설정',
    action: () => editor.chain().focus().setCellAttribute('colspan', 2).run(),
  },
];

type Props = {
  editor: Editor;
  className?: string;
  anchorEl: null | HTMLElement;
  onClose: () => void;
};
export const TableMenu = ({ editor, anchorEl, onClose }: Props) => {
  const handleClick = (menu: IOption) => {
    menu.action();
    onClose();
  };

  return (
    <Menu
      id="select-table-menu"
      MenuListProps={{
        'aria-labelledby': 'select-table-button',
      }}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      TransitionComponent={Fade}
    >
      {getTableMenus(editor).map((menu, index) => (
        <MenuItem value={index} key={index} onClick={() => handleClick(menu)}>
          <Typography variant="caption">{menu.label}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};
