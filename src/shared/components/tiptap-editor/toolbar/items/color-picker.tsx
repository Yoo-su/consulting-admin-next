'use client';

import { Editor } from '@tiptap/react';
import Box from '@mui/material/Box';
import { ChangeEvent } from 'react';

type Props = {
  editor: Editor;
};
const ColorPicker = ({ editor }: Props) => {
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setColor(event.target.value).run();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        component={'input'}
        type="color"
        onInput={handleInput}
        value={editor.getAttributes('textStyle').color}
        sx={{
          WebkitAppearance: 'none' as const,
          MozAppearance: 'none' as const,
          appearance: 'none' as const,
          width: 32,
          height: 32,
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          '&::-webkit-color-swatch': {
            borderRadius: 1,
            border: 'none',
          },
          '&::-moz-color-swatch': {
            borderRadius: 1,
            border: 'none',
          },
        }}
      />
    </Box>
  );
};

export default ColorPicker;
