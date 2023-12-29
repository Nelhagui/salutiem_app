import { API_CONFIG } from "../config/config";
import * as medicoAdapters from './../adapters/medicoAdapters'

export const getPerfil = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer 1|fKhudNMxcnTeE89UyNl3tvWoJyVCiFzzN8qDSOCZ");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS_ROL_MEDICO.perfil}`, requestOptions);
        const data = await response.json();

        const adaptedPerfilData = medicoAdapters.adaptPerfilResponse(data);

        return adaptedPerfilData;

    } catch (error) {
        console.error('Error fetching data from endpoint1:', error);
    }
};

export const updateSchedules = async (day, schedules) => {
    
    try {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer 1|fKhudNMxcnTeE89UyNl3tvWoJyVCiFzzN8qDSOCZ");
        var raw = JSON.stringify({
            "dia": day,
            "horario": schedules
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS_ROL_MEDICO.updateSchedules}`, requestOptions);
        const data = await response.json();
        const adaptedResponseApi = medicoAdapters.adaptSchedulesResponse(data);
        return adaptedResponseApi;
    } catch (error) {
        console.error('Error fetching data from endpoint1:', error);
    }
};