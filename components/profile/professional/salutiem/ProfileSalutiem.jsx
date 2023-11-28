import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { Chip } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';


const ProfileSalutiem = ({ navigation }) => {
    const especialidadesArray = [
        { id: 1, nombre: "Cardiología" },
        { id: 2, nombre: "Neurología" },
        { id: 3, nombre: "Traumatología" },
        { id: 4, nombre: "Radiología" },
        { id: 5, nombre: "Oncología" },
        { id: 6, nombre: "Dermatología" },
        // ... más especialidades ...
    ];
    const [data, setData] = useState({
        miniBio: '',

    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            const profileData = {
                nombre: "Nelson",
                apellido: "Aguiar",
                email: "nelson@example.com",
                direccion: "Calle Falsa 123",
                contraseña: "******", // Contraseña oculta
                foto: "https://tu-enlace-de-imagen.com/foto.jpg" // Reemplaza con la URL de la imagen
            }
            setData(profileData);
            setLoading(false);
        }, 2000); // 2 segundos de delay para simular la carga
    }, []);

    const handleEditPress = () => {
        navigation.navigate('EditProfileSalutiem', { userData: data });
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView style={styles.container}>
                    <View style={styles.containerSection}>
                        <Text style={styles.subtitle}>Datos Profesionales</Text>
                        <TextInput
                            label="Nro Matrícula Nacional"
                            value={data.miniBio}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />
                        <TextInput
                            label="Nro Matrícula Provincial"
                            value={data.miniBio}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />
                    </View>
                    <View style={styles.containerSection}>
                        <Text style={styles.subtitle}>Domicilio Consultario Principal</Text>
                        <TextInput
                            label="Provincia"
                            value={data.miniBio}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />
                        <TextInput
                            label="Calle"
                            value={data.miniBio}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />
                        <TextInput
                            label="Numeración"
                            value={data.miniBio}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />
                        <TextInput
                            label="Piso y Depto"
                            value={data.miniBio}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />
                    </View>
                    <View style={styles.containerSection}>
                        <Text style={styles.subtitle}>Domicilio Consultario Secundario</Text>
                        <TextInput
                            label="Provincia"
                            value={data.miniBio}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />
                        <TextInput
                            label="Calle"
                            value={data.miniBio}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />
                        <TextInput
                            label="Numeración"
                            value={data.miniBio}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />
                        <TextInput
                            label="Piso y Depto"
                            value={data.miniBio}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />
                    </View>
                    <View style={styles.containerSection}>
                        <Text style={styles.subtitle}>Precios Consultas</Text>
                        <TextInput
                            label="Precio Consulta Presencial"
                            value={data.miniBio}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />
                        <TextInput
                            label="Precio Consulta Virtual"
                            value={data.miniBio}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />
                    </View>
                    <View style={styles.containerSection}>
                        <View style={styles.headerChipContainer}>
                            <Text style={styles.subtitle}>Especialidades</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('EditSpecialties', { especialidadesPreseleccionadas: especialidadesArray })}>
                                <Text style={styles.configureText}>Configurar</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.chipContainer}>
                            <Chip mode="outlined">Example Chip</Chip>
                        </View>
                    </View>
                    <Button title="Editar Perfil" onPress={handleEditPress} />
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // No necesitas justifyContent ni alignItems aquí si quieres que los hijos ocupen todo el ancho
        backgroundColor: '#f5f5f5',
    },
    containerSection: {
        paddingTop: 20,
        paddingHorizontal: 10
    },
    chipContainer: {
        flexDirection: 'row', // Organiza los chips horizontalmente y permite el wrapping
        flexWrap: 'wrap', // Permite que los chips pasen a la siguiente línea si no hay espacio
        padding: 10, // Añade padding si es necesario
        alignItems: 'flex-start', // Alinea los chips al inicio del contenedor
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50, // Esto hará que la imagen sea circular
        marginBottom: 20,
    },
    profileText: {
        fontSize: 16,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 24
    },
    headerChipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Esto asegura que los Text estén alineados verticalmente
        paddingHorizontal: 10, // Añade un poco de espacio en los extremos
    },
    subtitle: {
        fontSize: 24,
        // Asegúrate de que el Text no tenga un ancho fijo para que no empuje al otro Text fuera de la pantalla
    },
    configureText: {
        textDecorationLine: 'underline'
        // Estilo para el texto de 'Configurar', como un peso de fuente diferente o color si es necesario
    },
});

export default ProfileSalutiem;
