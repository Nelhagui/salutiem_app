import React, { useState, } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import ScheduleModal from './ScheduleModal';
import { useSchedulesContext } from '../../../../../src/context/SchedulesContext';

const EditSchedules = () => {
    const { schedules } = useSchedulesContext();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

    const openModal = (day) => {
        setSelectedDay(day);
        setModalVisible(true);
    };
    const closeModal = () => {
        setModalVisible(false);
        setSelectedDay(null);
    };
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewStyle}>
                {Object.entries(schedules).map(([day, horariosDelDia], index) => (
                    <View key={index} style={styles.containerSection}>
                        <View>
                            <Text style={styles.nameDay}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
                            {horariosDelDia.length > 0
                                ? horariosDelDia.map((horario, index) => (
                                    <Text key={index}>Desde: {horario.desde}, Hasta: {horario.hasta}</Text>
                                ))
                                : <Text style={{color: '#da4a4a'}}>Sin horarios</Text>
                            }
                        </View>
                        <View style={styles.conteinerAction}>
                            <TouchableOpacity onPress={() => openModal(day)}>
                                <Text>Editar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <ScheduleModal
                visible={modalVisible}
                onClose={closeModal}
                day={selectedDay}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    scrollViewStyle: {
        // Example styles
        padding: 10,
        marginBottom: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    containerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        minHeight: 70, // Por ejemplo, si el tamaño de tu fuente es 20, puedes ajustar este valor
    },
    conteinerAction: {
        justifyContent: 'center'
    },
    text: {
        fontSize: 20, // Ajusta esto según el tamaño de tu fuente
        // Añade más estilos para el texto si es necesario
    },
    nameDay: {
        marginBottom: 5,
        fontWeight: 'bold',
        color: 'black',
    }
});

export default EditSchedules;
