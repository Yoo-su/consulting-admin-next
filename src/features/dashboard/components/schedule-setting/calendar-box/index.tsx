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
        mt: { xs: 4, sm: 6, md: 6, lg: 6, xl: 8 },
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
