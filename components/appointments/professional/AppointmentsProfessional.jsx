import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

const AppointmentsProfessional = ({navigation}) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulamos la carga de datos
    useEffect(() => {
        setTimeout(() => {
            // Aquí simularías la carga de datos de la base de datos
            const dataFromDatabase = [
                { id: 1, name: 'Turno 1' },
                { id: 2, name: 'Turno 2' },
                { id: 3, name: 'Turno 3' },
                { id: 4, name: 'Turno 4' },
                { id: 5, name: 'Turno 5' },
                { id: 6, name: 'Turno 6' },
                { id: 7, name: 'Turno 7' },
                { id: 8, name: 'Turno 8' },
                { id: 9, name: 'Turno 9' },
                { id: 10, name: 'Turno 10' },
                { id: 11, name: 'Turno 11' },
                { id: 12, name: 'Turno 12' },
                { id: 13, name: 'Turno 13' },
                { id: 14, name: 'Turno 14' },
                { id: 15, name: 'Turno 15' },
                { id: 16, name: 'Turno 16' },
                { id: 17, name: 'Turno 17' },
                { id: 18, name: 'Turno 18' },
                { id: 19, name: 'Turno 19' },
                { id: 20, name: 'Turno 20' },
                { id: 21, name: 'Turno 21' },
                { id: 22, name: 'Turno 22' },
                { id: 23, name: 'Turno 23' },
                { id: 24, name: 'Turno 24' },
                { id: 25, name: 'Turno 25' },
                { id: 26, name: 'Turno 26' },
                { id: 27, name: 'Turno 27' },
                { id: 28, name: 'Turno 28' },
                { id: 29, name: 'Turno 29' },
                { id: 30, name: 'Turno 30' }
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
                    paddingTop: 20,
                    paddingHorizontal: 10,
                    borderBottomColor: 'greey',
                }}
            >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quo blanditiis praesentium!
            </Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <ScrollView style={styles.scrollView}>
                        {appointments.map(appointment => (
                            <TouchableOpacity
                                key={appointment.id}
                                style={styles.appointmentItem}
                                onPress={() => navigation.navigate('AppointmentDetails', { appointment })}
                            >
                                <Text>{appointment.name}</Text>
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
    },
    appointmentItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default AppointmentsProfessional;
