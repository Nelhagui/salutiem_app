import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ScheduleList = ({onTimeSelected}) => {
    const [selectedTime, setSelectedTime] = useState(null);

    const times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30']; // Asume horarios fijos, ajusta según sea necesario

    const showButton = (time) => {
        setSelectedTime(time);
    };
    
    const selectTime = (time) => {
        onTimeSelected(time);
    }

    return (
        <ScrollView style={styles.scrollViewStyle}>
            {times.map((time, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.timeContainer}
                  onPress={() => showButton(time)}
                >
                    <Text style={styles.timeText}>{time}</Text>
                    {selectedTime === time && (
                        <TouchableOpacity style={styles.reserveButton} onPress={() => selectTime(time)}>
                            <Text style={styles.buttonText}>Reservar</Text>
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    scrollViewStyle: {
        // Estilos adicionales si son necesarios
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 5,
        width: Dimensions.get('window').width - 20,
        marginHorizontal: 10,
    },
    timeText: {
        // Estilos para el texto del horario
    },
    reserveButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        // Estilos para el texto del botón
    }
});

export default ScheduleList