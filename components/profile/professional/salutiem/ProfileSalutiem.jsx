import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Image,
    StyleSheet,
    ActivityIndicator,
    TextInput,
    Text,
    Button,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { getPerfil } from '../../../../src/services/servicesRolMedico';

import { Chip } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

import { useSchedulesContext } from '../../../../src/context/SchedulesContext';



const ProfileSalutiem = ({ navigation }) => {

    const { schedules, setSchedules } = useSchedulesContext();
    const [horarios, setHorarios] = useState({})
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleSearchButtonPress = () => {
        navigation.navigate('AddressSearch');
    };
    const handleOnPress = (location) => {
        setSelectedLocation(location);
    };

    const especialidadesArray = [
        { id: 1, nombre: "Cardiología" },
        { id: 2, nombre: "Neurología" },
        { id: 3, nombre: "Traumatología" },
        { id: 4, nombre: "Radiología" },
        { id: 5, nombre: "Oncología" },
        { id: 6, nombre: "Dermatología" }
    ];
    const [data, setData] = useState({
        miniBio: '',

    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataPerfil = async () => {
            try {
                const profileData = await getPerfil();
                setData(profileData);
                setSchedules(profileData.horarios)
            } catch (error) {
                console.error('Error al obtener datos del perfil:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDataPerfil();
    }, []);

    const handleEditPress = () => {
        navigation.navigate('EditProfileSalutiem', { userData: data });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled
            keyboardVerticalOffset={Platform.OS === 'ios' ? 75 : 0}
        >
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <ScrollView style={styles.container}>
                        <View style={styles.containerSection}>
                            <View style={styles.headerOptionContainer}>
                                <Text style={styles.subtitle}>Horarios</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('EditSchedules', { horarios: schedules })}>
                                    <Text style={styles.configureText}>Configurar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 5 }}>
                                <Text style={schedules?.lunes?.length > 0 ? styles.itemsDay : styles.itemsDayInactive}>Lun</Text>
                                <Text style={schedules?.martes?.length > 0 ? styles.itemsDay : styles.itemsDayInactive}>Mar</Text>
                                <Text style={schedules?.miercoles?.length > 0 ? styles.itemsDay : styles.itemsDayInactive}>Miér</Text>
                                <Text style={schedules?.jueves?.length > 0 ? styles.itemsDay : styles.itemsDayInactive}>Jue</Text>
                                <Text style={schedules?.viernes?.length > 0 ? styles.itemsDay : styles.itemsDayInactive}>Vie</Text>
                                <Text style={schedules?.sabado?.length > 0 ? styles.itemsDay : styles.itemsDayInactive}>Sáb</Text>
                                <Text style={schedules?.domingo?.length > 0 ? styles.itemsDay : styles.itemsDayInactive}>Dom</Text>
                            </View>
                        </View>
                        <View style={styles.containerSection}>
                            <Text style={styles.subtitle}>Datos Profesionales</Text>

                            <View style={styles.contentProfileText}>
                                <Text style={styles.labelProfileText}>Nro Matrícula Nacional</Text>
                                <TextInput
                                    style={styles.profileText}
                                    // onChangeText={(text) => setUserData({ ...userData, direccion: text })}
                                    value={data?.matriculaNacional}
                                    placeholder="Nro Matrícula Nacional"
                                />
                            </View>

                            <View style={styles.contentProfileText}>
                                <Text style={styles.labelProfileText}>Nro Matrícula Provincial</Text>
                                <TextInput
                                    style={styles.profileText}
                                    // onChangeText={(text) => setUserData({ ...userData, direccion: text })}
                                    value={data?.matriculaProvincial}
                                    placeholder="Nro Matrícula Provincial"
                                />
                            </View>
                        </View>

                        <View style={styles.containerSection}>
                            <Text style={styles.subtitle}>Domicilio Consultorio Principal</Text>
                            <View style={styles.contentProfileText}>
                                <Text style={styles.labelProfileText}>Dirección</Text>
                                <TextInput
                                    style={styles.profileText}
                                    // onChangeText={(text) => setUserData({ ...userData, direccion: text })}
                                    value={data?.domicilioConsultorioPrincipal}
                                    placeholder="ingrese dirección"
                                />
                            </View>
                            <View style={styles.contentProfileText}>
                                <Text style={styles.labelProfileText}>Piso y Depto</Text>
                                <TextInput
                                    style={styles.profileText}
                                    // onChangeText={(text) => setUserData({ ...userData, direccion: text })}
                                    value={data?.pisoDeptoPrincipal}
                                    placeholder="ingrese piso y depto"
                                />
                            </View>
                        </View>
                        <View style={styles.containerSection}>
                            <Text style={styles.subtitle}>Domicilio Consultorio Secundario</Text>
                            <View style={styles.contentProfileText}>
                                <Text style={styles.labelProfileText}>Dirección</Text>
                                <TextInput
                                    style={styles.profileText}
                                    // onChangeText={(text) => setUserData({ ...userData, direccion: text })}
                                    value={data?.domicilioConsultorioSecundario}
                                    placeholder="ingrese dirección"
                                />
                            </View>
                            <View style={styles.contentProfileText}>
                                <Text style={styles.labelProfileText}>Piso y Depto</Text>
                                <TextInput
                                    style={styles.profileText}
                                    // onChangeText={(text) => setUserData({ ...userData, direccion: text })}
                                    value={data?.pisoDeptoSecundario}
                                    placeholder="ingrese piso y depto"
                                />
                            </View>
                        </View>
                        <View style={styles.containerSection}>
                            <Text style={styles.subtitle}>Precios Consultas</Text>
                            <View style={styles.contentProfileText}>
                                <Text style={styles.labelProfileText}>Precio Consulta Presencial</Text>
                                <TextInput
                                    style={styles.profileText}
                                    // onChangeText={(text) => setUserData({ ...userData, direccion: text })}
                                    value={data?.precioConsultaPresencial}
                                    placeholder="ingrese precio"
                                />
                            </View>
                            <View style={styles.contentProfileText}>
                                <Text style={styles.labelProfileText}>Precio Consulta Virtual</Text>
                                <TextInput
                                    style={styles.profileText}
                                    // onChangeText={(text) => setUserData({ ...userData, direccion: text })}
                                    value={data?.precioConsultaVirtual}
                                    placeholder="ingrese precio"
                                />
                            </View>
                        </View>
                        <View style={styles.containerSection}>
                            <View style={styles.headerOptionContainer}>
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
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    containerMap: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 50,
    },
    map: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        // No necesitas justifyContent ni alignItems aquí si quieres que los hijos ocupen todo el ancho
        backgroundColor: '#f5f5f5',
    },
    containerSection: {
        paddingTop: 20,
        paddingHorizontal: 10,
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
        fontSize: 24,
        marginBottom: 7,
    },
    headerOptionContainer: {
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 5
    },
    configureText: {
        textDecorationLine: 'underline'
    },
    contentProfileText: {
        paddingVertical: 4,
        marginBottom: 7,
    },
    profileText: {
        fontWeight: '400',
        fontSize: 16,
        color: '#383b3d',
        borderWidth: 0.4,
        padding: 10,
        borderRadius: 6,
        borderBottomColor: '#5f6367',
    },
    labelProfileText: {
        fontSize: 13,
        color: '#5f6367',
        marginBottom: 4,
    },
    itemsDay: {
        marginRight: 6,
        borderWidth: 0.5,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 5
    },
    itemsDayInactive: {
        marginRight: 6,
        borderWidth: 0.5,
        opacity: 0.4,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 5
    }
});

export default ProfileSalutiem;
