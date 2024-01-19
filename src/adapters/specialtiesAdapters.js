export const adapterSpecialtiesResponse = (data) => {
    console.log('data adapter', data)
    return {
        id: data?.id,
        nombre: data?.nombre,
        tipo_entidad: data?.tipo_entidad,
    };
};