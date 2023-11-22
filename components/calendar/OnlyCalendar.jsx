import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import generarFechasHabilitadas from '../utilities/generarFechasHabilitadas';
import { LocaleConfig } from 'react-native-calendars';


const OnlyCalendar = ({ onDateSelected }) => {
    LocaleConfig.locales['es'] = {
        monthNames: [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        monthNamesShort: [
            'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
            'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ],
        dayNames: [
            'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
        ],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        today: 'Hoy'
    };
    LocaleConfig.defaultLocale = 'es';

    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [markedDates, setMarkedDates] = useState({});

    const ajustarAlPrimerDiaDelMes = (fecha) => {
        return new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    };

    const [currentMonth, setCurrentMonth] = useState(ajustarAlPrimerDiaDelMes(new Date()));

    const onDayPress = (day) => {
        setFechaSeleccionada(day.dateString);

        // Actualizar las fechas marcadas con la nueva fecha seleccionada
        setMarkedDates({
            ...markedDates, // Conserva las fechas marcadas existentes
            [day.dateString]: { // Añade o actualiza la fecha seleccionada
                selected: true,
                marked: true,
                selectedColor: 'blue' // Puedes cambiar el color si lo deseas
            }
        });

        onDateSelected(day.dateString);
    };

    const onMonthChange = (month) => {
        const newDate = new Date(month.year, month.month - 1, 1);
        setCurrentMonth(newDate);
    };

    const obtenerDiasDelMes = (fecha) => {
        let inicioMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
        let inicioProximoMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 1);
        let diferenciaTiempo = inicioProximoMes - inicioMes;
        let diferenciaDias = diferenciaTiempo / (1000 * 3600 * 24);
        return diferenciaDias;
    };

    useEffect(() => {
        const diasDelMes = obtenerDiasDelMes(currentMonth);
        let nuevasFechasMarcadas = generarFechasHabilitadas(currentMonth, diasDelMes);

        // Conservar la marca de la fecha seleccionada si aún es relevante
        if (fechaSeleccionada && nuevasFechasMarcadas[fechaSeleccionada]) {
            nuevasFechasMarcadas[fechaSeleccionada] = { ...nuevasFechasMarcadas[fechaSeleccionada], selected: true, marked: true, selectedColor: 'blue' };
        }

        setMarkedDates(nuevasFechasMarcadas);
    }, [currentMonth, fechaSeleccionada]);

    const today = new Date().toISOString().split('T')[0];


    return (
        <>
            <Calendar
                onDayPress={onDayPress}
                markedDates={markedDates}
                minDate={today}
                onMonthChange={onMonthChange}
                locale="es"
            />
        </>
    )
}

export default OnlyCalendar