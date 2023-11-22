const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

// Función getDistance
const getDistance = (lat1, lon1, lat2, lon2) => {
    const EARTH_RADIUS = 6371; // Radio de la Tierra en kilómetros
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = EARTH_RADIUS * c; // Distancia en metros

    return distance;
};

export { getDistance };