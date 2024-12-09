'use client';

import 'react-calendar/dist/Calendar.css';

import { useCallback, useState } from 'react';

import { TiptapEditor } from '@/features/tiptap-editor/components';
import { ContentWrapper } from '@/shared/components';

export const CalendarBox = () => {
  const [text, setText] = useState<string>('');

  const handleChangeText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  return (
    <ContentWrapper>
      <TiptapEditor value={text} handleChangeValue={handleChangeText} />
    </ContentWrapper>
  );
};
