'use client';

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

  const editor = useTextEditor({
    placeholder: '내용을 작성해주세요',
    value: value,
    onChange: handleChangeValue,
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
};

export default Tiptap;
