// Importando la librería necesaria para manejar fechas
import moment from 'moment';
import momentTz from 'moment-timezone';

export function formatearFecha(fechaHoraStr) {
    // Convierte una fecha en formato 'YYYY-MM-DD HH:MM:SS' a 'DD-MM-YY'
    return moment(fechaHoraStr).format('DD-MM-YY');
}

export function formatearHora(fechaHoraStr) {
    // Convierte una hora en formato 'YYYY-MM-DD HH:MM:SS' a 'HH:MM'
    return moment(fechaHoraStr).format('HH:mm');
}

export const stringToTime = (timeString) => {
    const timeZone = 'America/Argentina/Buenos_Aires';
    return momentTz.tz(timeString, 'HH:mm', timeZone).toDate();
};

// Función para convertir objeto Date a string "hh:ii"
export const timeToString = (date) => {
    return moment(date).format('HH:mm');
};

