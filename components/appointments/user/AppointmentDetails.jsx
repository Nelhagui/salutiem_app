// AppointmentDetails.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, TextInput } from 'react-native';

const AppointmentDetails = ({ route, navigation }) => {
    const { appointment } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCancel = () => {
        setModalVisible(true);
    };

    const handleConfirmCancellation = () => {
        setIsSubmitting(true);
        // Simula una petición al backend
        setTimeout(() => {
            setIsSubmitting(false);
            setModalVisible(false);
            // Aquí decides si fue exitoso o no y navegas a la pantalla correspondiente
            navigation.navigate('CancellationResult', { success: true });
        }, 2000);
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Detalle del Turno</Text>
                <Text>ID: {appointment.id}</Text>
                <Text>Nombre: {appointment.name}</Text>
                <Button title="Cancelar Turno" onPress={handleCancel} />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Motivo de Cancelación</Text>
                        <TextInput style={styles.input} placeholder="Ingrese el motivo" />
                        <Button title="Confirmar Cancelación" onPress={handleConfirmCancellation} />
                        <Button title="Cerrar" onPress={() => setModalVisible(false)} color="red" />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        width: 200,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default AppointmentDetails;
