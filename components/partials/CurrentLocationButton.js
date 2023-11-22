import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const CurrentLocationButton = ({ onPress }) => (
    <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
        <MaterialIcons name="my-location" size={24} color="white" />
    </TouchableOpacity>
);

export default CurrentLocationButton;

// Puedes agregar estilos específicos para este botón aquí o importarlos desde otro archivo
const styles = StyleSheet.create({
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#0000ff',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    
});