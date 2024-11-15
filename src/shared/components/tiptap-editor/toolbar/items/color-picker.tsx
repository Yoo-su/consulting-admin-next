'use client';

import Box from '@mui/material/Box';
import { Editor } from '@tiptap/react';
import { ChangeEvent, useCallback } from 'react';

type Props = {
  editor: Editor;
  downlg: boolean;
};
const ColorPicker = ({ editor, downlg }: Props) => {
  const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setColor(event.target.value).run();
  }, []);

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
        value={editor.getAttributes('textStyle').color ?? '#000000'}
        sx={{
          WebkitAppearance: 'none' as const,
          MozAppearance: 'none' as const,
          appearance: 'none' as const,
          width: downlg ? 28 : 32,
          height: downlg ? 28 : 32,
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
