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

export const registerFetch = async (dataForm) => {
    try {
        // Paso 1: Obtener el token CSRF
        const getCSRFToken = async () => {
            try {
                var myHeaders = new Headers();
                myHeaders.append("Accept", "application/json");
                myHeaders.append("Content-Type", "application/json");

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    credentials: 'include',  // Incluir las cookies en la solicitud
                    redirect: 'follow'
                };

                const response = await fetch(`${API_CONFIG.BASE_URL}/sanctum/csrf-cookie`, requestOptions);
                console.log('Token CSRF obtenido:', response);
            } catch (error) {
                console.error('Error al obtener el token CSRF:', error);
            }
        };

        // Llamar a la función para obtener el token CSRF
        await getCSRFToken();

        // DESDE ACA
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(dataForm),
            credentials: 'include',  // Incluir las cookies en la solicitud
            redirect: 'follow'
        };
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS_AUTH.register}`, requestOptions);
        const data = await response.json();
        console.log('responseeeee', response);
        // const adaptedPerfilData = medicoAdapters.adaptPerfilResponse(data);

        // return adaptedPerfilData;

    } catch (error) {
        console.error('Error fetching data from endpoint1:', error);
    }
};
