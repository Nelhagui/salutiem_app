import { API_CONFIG } from "../config/config";
import * as medicoAdapters from '../adapters/medicoAdapters'
import { adapterSpecialtiesResponse } from "../adapters/specialtiesAdapters";

export const getAllSpecialties = async (accessToken) => {
    console.log('paso token', accessToken);
    try {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS_ROL_MEDICO.perfil}`, requestOptions);
        console.log('respuesta de api', response)
        const data = await response.json();
        console.log('data json', data)
        
        const adaptedPerfilData = medicoAdapters.adaptPerfilResponse(data);
        console.log('data adaptada', adaptedPerfilData)

        return adaptedPerfilData;

    } catch (error) {
        console.error('Error fetching data from endpoint1:', error);
    }
};

export const searchSpecialty = async (query, accessToken) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS_ROL_PACIENTE.searchSpecialty}/${query}`, requestOptions);
        const data = await response.json();

        const adapterResponseData = data.map(adapterSpecialtiesResponse);

        return adapterResponseData;

    } catch (error) {
        console.error('Error fetching data from endpoint1:', error);
    }
};

export const updateSchedules = async (day, schedules, accessToken) => {
    
    try {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${accessToken}`);
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

export const getSimilarAddresses = async (input) => {
    try {
        const response = await fetch(`${API_CONFIG.GOOGLE_API_AUTOCOMPLETE_URL}${input}`);
        return response
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