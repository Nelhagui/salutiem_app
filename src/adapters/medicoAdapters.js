export const adaptPerfilResponse = (data) => {
    // Realiza cualquier transformación necesaria en la respuesta de perfil
    return {
        nombre: data?.nombre,
        apellido: data?.apellido,
        horarios: {
            "lunes": JSON.parse(data?.agenda?.lunes),
            "martes": JSON.parse(data?.agenda?.martes),
            "miercoles": JSON.parse(data?.agenda?.miercoles),
            "jueves": JSON.parse(data?.agenda?.jueves),
            "viernes": JSON.parse(data?.agenda?.viernes),
            "sabado": JSON.parse(data?.agenda?.sabado),
            "domingo": JSON.parse(data?.agenda?.domingo),
        },
        matriculaNacional: data?.matriculaNacional,
        matriculaProvincial: data?.matriculaProvincial,
        domicilioConsultorioPrincipal: data?.domicilioConsultorioPrincipal,
        domicilioConsultorioSecundario: data?.domicilioConsultorioSecundario,
        precioConsultaPresencial: data?.precioConsultaPresencial,
        precioConsultaVirtual: data?.precioConsultaVirtual,
    };
};

export const adaptSchedulesResponse = (data) => {
    return {
            "lunes": data?.lunes ? JSON.parse(data.lunes) : [],
            "martes": data?.martes ? JSON.parse(data.martes) : [],
            "miercoles": data?.miercoles ? JSON.parse(data.miercoles) : [],
            "jueves": data?.jueves ? JSON.parse(data.jueves) : [],
            "viernes": data?.viernes ? JSON.parse(data.viernes) : [],
            "sabado": data?.sabado ? JSON.parse(data.sabado) : [],
            "domingo": data?.domingo ? JSON.parse(data.domingo) : [],
        }
};

export const adaptTurnosResponse = (data) => {
    // Realiza cualquier transformación necesaria en la respuesta de turnos
    return {
        turnos: data.turnos,
        // Otros campos que quieras incluir o transformar
    };
};