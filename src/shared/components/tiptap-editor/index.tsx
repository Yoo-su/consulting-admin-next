'use client';

import { useState } from 'react';
import { EditorContent } from '@tiptap/react';
import { useTheme } from '@mui/material/styles';

import Toolbar from './toolbar';
import { useTextEditor } from '@/shared/hooks/use-text-editor';
import { TiptapContainer } from './styled';

type TiptapProps = {
  value: string;
  handleChangeValue: (newValue: string) => void;
};
const Tiptap = ({ value, handleChangeValue }: TiptapProps) => {
  const theme = useTheme();
  const [tab, setTab] = useState<'editor' | 'preview'>('editor');

  const editor = useTextEditor({
    placeholder: '에디터 내용을 작성해주세요',
    value: value,
    onChange: handleChangeValue,
    tab: tab,
    editable: true,
  });

  return (
    <TiptapContainer
      direction={'column'}
      spacing={2}
      className="tiptap-container"
      sx={{
        '.tiptap': {
          fontFamily: theme.typography.body1,
        },
      }}
    >
      {editor && <Toolbar editor={editor} content={value} />}
      <EditorContent editor={editor} style={{ whiteSpace: 'pre-line' }} />
    </TiptapContainer>
  );
};

export default Tiptap;
