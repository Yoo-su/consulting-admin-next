'use client';

import { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import ContentWrapper from '@/shared/components/content-wrapper';
import Tiptap from '@/shared/components/tiptap-editor';
import 'react-calendar/dist/Calendar.css';

const CalendarBox = () => {
  const [text, setText] = useState<string>('');

  const handleChangeText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  return (
    <ContentWrapper>
      <Tiptap value={text} handleChangeValue={handleChangeText} />
    </ContentWrapper>
  );
};

export default CalendarBox;
