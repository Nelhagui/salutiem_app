const generarFechasHabilitadas = (startDate, numberOfDays) => {
    let currentDay = new Date(startDate);
    let enabledDates = {};
    for (let i = 0; i < numberOfDays; i++) {
        const dayOfWeek = currentDay.getDay();
        const dateString = currentDay.toISOString().split('T')[0];

        // Lunes = 1, Martes = 2, Miércoles = 3, Viernes = 5, Sábado = 6
        if (dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 3 || dayOfWeek === 5 || dayOfWeek === 6) {
            const dateString = currentDay.toISOString().split('T')[0];
            enabledDates[dateString] = { selected: false, marked: true };
        } else {
            // Para los días no incluidos (jueves y domingo), marcar como deshabilitado
            enabledDates[dateString] = { disabled: true, disableTouchEvent: true };
        }

        // Avanzar al siguiente día
        currentDay.setDate(currentDay.getDate() + 1);
    }

    return enabledDates;
};

export default generarFechasHabilitadas;
