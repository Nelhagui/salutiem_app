const apiKeyGoogle = 'AIzaSyBX1zC916-LEETKn_hbvCtTuWdPBBacdtU';
export const API_CONFIG = {
    GOOGLE_API_AUTOCOMPLETE_URL: `https://maps.googleapis.com/maps/api/place/autocomplete/json?types=geocode&region=ar&key=${apiKeyGoogle}&input=`,
    GOOGLE_API_GET_COORDINATES_URL: `https://maps.googleapis.com/maps/api/geocode/json?key=${apiKeyGoogle}&place_id=`,
    BASE_URL: 'https://salutiem.cartasimple.com.ar/api/public/',
    ENDPOINTS_ROL_MEDICO: {
        perfil: 'api/medico/perfil',
        agenda: 'api/medico/agenda',
        updateSchedules: 'api/medico/agendas/actualizar',
        specialties: 'api/especialidades',
        subSpecialties: 'api/subespecialidades',
    },
    ENDPOINTS_ROL_PACIENTE: {
        rolMedicoMiAgenda: 'api/medico/agenda',
        searchSpecialty: 'api/paciente/especialidades/buscar'
    },
    ENDPOINTS_AUTH: {
        login: 'api/login',
        register: 'register',
    },
};