import { API_CONFIG } from "../config/config";

export const getAutocomplete = async (query) => {
    try {
        const response = await fetch(`${API_CONFIG.GOOGLE_API_AUTOCOMPLETE_URL}${query}`);
        const data = await response.json();
        return data?.predictions;
    } catch (error) {
        console.error('Error fetching data from endpoint1:', error);
    }
};

export const getCoordinatesAddresses = async (place_id) => {
    try {
        const response = await fetch(`${API_CONFIG.GOOGLE_API_GET_COORDINATES_URL}${place_id}`);
        return response
    } catch (error) {
        console.error('Error fetching data from endpoint1:', error);
    }
};