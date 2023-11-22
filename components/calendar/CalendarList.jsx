import React from 'react'
import { CalendarProvider, AgendaList, ExpandableCalendar } from 'react-native-calendars';

const CalendarList = () => {
    // Datos de ejemplo para la agenda
  const items = {
    '2023-11-01': [{name: 'Evento 1'}],
    '2023-11-02': [{name: 'Evento 2'}, {name: 'Evento 3'}],
    // Añade más fechas y eventos según sea necesario
  };
    return (
        <CalendarProvider
          // Propiedades para CalendarProvider si es necesario
        >
          <ExpandableCalendar
            // Propiedades para ExpandableCalendar si es necesario
          />
          <AgendaList
            sections={items}
            // Puedes añadir más propiedades para personalizar tu AgendaList
          />
        </CalendarProvider>
      );
}

export default CalendarList