'use client';

import { Fade, Menu, MenuItem } from '@mui/material';
import { Level } from '@tiptap/extension-heading';
import { Editor } from '@tiptap/react';

type Option = {
  value: number;
  label: string;
};
const options: Option[] = [
  {
    value: 1,
    label: 'H1',
  },
  {
    value: 2,
    label: 'H2',
  },
  {
    value: 3,
    label: 'H3',
  },
  {
    value: 4,
    label: 'H4',
  },
  {
    value: 5,
    label: 'H5',
  },
  {
    value: 6,
    label: 'H6',
  },
];

type Props = {
  editor: Editor;
  anchorEl: null | HTMLElement;
  onClose: () => void;
};
export const HeadingMenu = ({ editor, anchorEl, onClose }: Props) => {
  const handleSelectHeading = (heading: Level) => {
    editor.chain().focus().toggleHeading({ level: heading }).run();
    onClose();
  };

  return (
    <Menu
      id="select-heading-menu"
      MenuListProps={{
        'aria-labelledby': 'select-heading-button',
      }}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      TransitionComponent={Fade}
    >
      {options.map((option, index) => (
        <MenuItem key={index} onClick={() => handleSelectHeading(option.value as Level)}>
          {option.label}
        </MenuItem>
      ))}
    </Menu>
  );
};
