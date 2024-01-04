export const API_CONFIG = {
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
    },
    ENDPOINTS_AUTH: {
        login: 'api/login',
        register: 'api/register',
    },
};