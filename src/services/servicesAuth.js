import { API_CONFIG } from "../config/config";
import * as medicoAdapters from '../adapters/medicoAdapters'

export const loginFetch = async (email, password) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": email,
            "password": password,
            "device_name": "app_phone"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS_AUTH.login}`, requestOptions);
        return response

    } catch (error) {
        console.error('Error fetching data from endpoint1:', error);
    }
};

export const registerFetch = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS_ROL_MEDICO.specialties}`, requestOptions);
        const data = await response.json();

        const adaptedPerfilData = medicoAdapters.adaptPerfilResponse(data);

        return adaptedPerfilData;

    } catch (error) {
        console.error('Error fetching data from endpoint1:', error);
    }
};
