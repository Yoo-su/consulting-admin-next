'use client';

import 'react-calendar/dist/Calendar.css';

import { useCallback, useState } from 'react';
import Calendar from 'react-calendar';

import Tiptap from '@/features/tiptap-editor/components';
import ContentWrapper from '@/shared/components/ui/content-wrapper';

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
