'use client';

import { useTheme } from '@mui/material/styles';
import { EditorContent } from '@tiptap/react';
import { debounce } from 'lodash';
import { memo, useCallback } from 'react';

import { useTextEditor } from '../hooks';
import { TiptapContainer } from '../styles';
import { Toolbar } from './widgets';

type TiptapProps = {
  value: string;
  handleChangeValue: (newValue: string) => void;
};
export const TiptapEditor = memo(
  ({ value, handleChangeValue }: TiptapProps) => {
    const theme = useTheme();

    const debouncedHandleChangeValue = useCallback(
      debounce((newValue: string) => {
        handleChangeValue(newValue);
      }, 1000),
      [handleChangeValue]
    );

    const editor = useTextEditor({
      placeholder: '내용을 작성해주세요',
      value: value,
      onChange: debouncedHandleChangeValue,
      editable: true,
    });

    return (
      <TiptapContainer
        direction={'column'}
        className="tiptap-container"
        sx={{
          '.tiptap': {
            fontFamily: theme.typography.body1,
          },
        }}
      >
        {editor && <Toolbar editor={editor} />}
        <EditorContent editor={editor} style={{ whiteSpace: 'pre-line' }} />
      </TiptapContainer>
    );
  }
);
TiptapEditor.displayName = 'TiptapEditor';
