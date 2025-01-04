"use client";

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarPage = () => {
  const handleDateClick = (arg: { dateStr: string; }) => {
    alert('Date clicked: ' + arg.dateStr);
  };

  return (
    <div>
      <h1>Workout Schedule</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={[
          { title: 'Workout 1', date: '2023-10-01' },
          { title: 'Workout 2', date: '2023-10-02' },
          // ...more events...
        ]}
      />
    </div>
  );
};

export default CalendarPage;
