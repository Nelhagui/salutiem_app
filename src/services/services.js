import { API_CONFIG } from "../config/config";

export const getMedicos = async () => {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.medicos}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data from endpoint1:', error);
    }
};

