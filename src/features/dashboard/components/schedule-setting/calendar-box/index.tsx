'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import 'react-calendar/dist/Calendar.css';

const CalendarBox = () => {
  const [date, setDate] = useState(new Date());
  return (
    <Card
      sx={{
        mt: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '1rem',
        p: 3,
      }}
    >
      <Calendar value={date} />
    </Card>
  );
};

export default CalendarBox;
