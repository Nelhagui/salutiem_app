import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { formatearFecha, formatearHora } from '../../utilities/FormatoFechaHora';
import Svg, { Path } from "react-native-svg"

const AppointmentsProfessional = ({ navigation }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulamos la carga de datos
    useEffect(() => {
        setTimeout(() => {
            // Aquí simularías la carga de datos de la base de datos
            const dataFromDatabase = [
                { "id": 1, "nombre": "Julia", "apellido": "Muñoz", "especialidad": "Psiquiatría", "fecha_hora": "2023-09-03 13:07:59" },
                { "id": 2, "nombre": "Helena", "apellido": "Ramírez", "especialidad": "Neumología", "fecha_hora": "2023-11-09 08:10:47" },
                { "id": 3, "nombre": "Iván", "apellido": "Jiménez", "especialidad": "Neumología", "fecha_hora": "2023-12-19 02:06:03" },
                { "id": 4, "nombre": "Olivia", "apellido": "Pérez", "especialidad": "Dermatología", "fecha_hora": "2023-08-08 03:58:54" },
                { "id": 5, "nombre": "Iván", "apellido": "García", "especialidad": "Oftalmología", "fecha_hora": "2023-08-28 14:05:18" },
                { "id": 6, "nombre": "Sergio", "apellido": "González", "especialidad": "Urología", "fecha_hora": "2023-01-04 15:55:29" },
                { "id": 7, "nombre": "Helena", "apellido": "González", "especialidad": "Oncología", "fecha_hora": "2023-01-04 15:10:54" },
                { "id": 8, "nombre": "Fernanda", "apellido": "Sánchez", "especialidad": "Nutrición", "fecha_hora": "2023-11-02 17:21:18" },
                { "id": 9, "nombre": "Sergio", "apellido": "Pérez", "especialidad": "Gastroenterología", "fecha_hora": "2023-12-20 13:28:43" },
                { "id": 10, "nombre": "Carlos", "apellido": "Díaz", "especialidad": "Infectología", "fecha_hora": "2023-04-16 23:15:45" },
                { "id": 11, "nombre": "Gabriel", "apellido": "Jiménez", "especialidad": "Geriatría", "fecha_hora": "2023-02-06 13:34:18" },
                { "id": 12, "nombre": "Valeria", "apellido": "Torres", "especialidad": "Infectología", "fecha_hora": "2023-01-25 08:38:59" },
                { "id": 13, "nombre": "Fernanda", "apellido": "Jiménez", "especialidad": "Hematología", "fecha_hora": "2023-08-27 12:33:09" },
                { "id": 14, "nombre": "Valeria", "apellido": "Ramírez", "especialidad": "Oftalmología", "fecha_hora": "2023-08-05 17:55:56" },
                { "id": 15, "nombre": "Julia", "apellido": "Alvarez", "especialidad": "Neumología", "fecha_hora": "2023-05-24 17:28:38" },
                { "id": 16, "nombre": "Helena", "apellido": "Vázquez", "especialidad": "Cardiología", "fecha_hora": "2023-10-26 16:53:14" },
                { "id": 17, "nombre": "Tania", "apellido": "Ramírez", "especialidad": "Psiquiatría", "fecha_hora": "2023-06-25 16:42:26" },
                { "id": 18, "nombre": "Ana", "apellido": "Jiménez", "especialidad": "Nutrición", "fecha_hora": "2023-01-05 16:51:17" },
                { "id": 19, "nombre": "Helena", "apellido": "García", "especialidad": "Oftalmología", "fecha_hora": "2023-06-21 01:04:21" },
                { "id": 20, "nombre": "Gabriel", "apellido": "Alvarez", "especialidad": "Psiquiatría", "fecha_hora": "2023-08-31 01:26:48" },
                { "id": 21, "nombre": "Carlos", "apellido": "González", "especialidad": "Oncología", "fecha_hora": "2023-01-02 20:11:46" },
                { "id": 22, "nombre": "Fernanda", "apellido": "Muñoz", "especialidad": "Urología", "fecha_hora": "2023-12-27 22:03:01" },
                { "id": 23, "nombre": "Pablo", "apellido": "Torres", "especialidad": "Pediatría", "fecha_hora": "2023-02-01 00:50:03" },
                { "id": 24, "nombre": "Yolanda", "apellido": "Muñoz", "especialidad": "Dermatología", "fecha_hora": "2023-05-27 23:15:11" },
                { "id": 25, "nombre": "Luis", "apellido": "Torres", "especialidad": "Nefrología", "fecha_hora": "2023-05-10 00:12:31" },
                { "id": 26, "nombre": "Eduardo", "apellido": "Jiménez", "especialidad": "Neumología", "fecha_hora": "2023-11-30 02:10:11" },
                { "id": 27, "nombre": "Fernanda", "apellido": "García", "especialidad": "Geriatría", "fecha_hora": "2023-01-17 04:43:38" },
                { "id": 28, "nombre": "Fernanda", "apellido": "Castillo", "especialidad": "Psicología", "fecha_hora": "2023-06-15 20:36:31" },
                { "id": 29, "nombre": "Raquel", "apellido": "Torres", "especialidad": "Urología", "fecha_hora": "2023-05-14 23:39:41" },
                { "id": 30, "nombre": "Olivia", "apellido": "Vázquez", "especialidad": "Cardiología", "fecha_hora": "2023-02-28 01:36:01" }
            ];

            setAppointments(dataFromDatabase);
            setLoading(false);
        }, 2000); // 2 segundos de delay para simular la carga
    }, []);

    return (
        <View style={styles.container}>
            <Text
                style={{
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: '500',
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    borderBottomColor: '#0000ff',
                }}
            >
                Turnos
            </Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                        {appointments.map(appointment => (
                            <TouchableOpacity
                                key={appointment.id}
                                style={styles.appointmentItem}
                                onPress={() => navigation.navigate('AppointmentDetails', { appointment })}
                            >
                                <View>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{
                                            marginBottom: 5,
                                            fontWeight: 'bold',
                                            color: '#46484a',
                                        }}>
                                            {appointment.nombre} {appointment.apellido}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text>{formatearFecha(appointment.fecha_hora)} {formatearHora(appointment.fecha_hora)} hs</Text>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Svg
                                        width={28}
                                        height={28}
                                        marginRight={5}
                                        viewBox="0 -960 960 960"
                                    >
                                        <Path d="M536.924-480.615 342.77-675.154l32.615-32.614 226.768 227.153-226.768 226.768-32.615-32.615 194.154-194.153Z" fill="#5f6367" />
                                    </Svg>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        width: '100%',
        padding: 20,
        paddingBottom: 100,
    },
    scrollViewContent: {
        paddingBottom: 100, // Aumentado para asegurar espacio adicional al final
    },
    appointmentItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default AppointmentsProfessional;
