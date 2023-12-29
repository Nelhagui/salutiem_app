import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchRegionButton = ({ onPress }) => (
    <TouchableOpacity style={styles.searchButton} onPress={onPress}>
        <Text style={styles.searchButtonText}>Buscar en esta región</Text>
    </TouchableOpacity>
);

export default SearchRegionButton;

// Puedes agregar estilos específicos para este botón aquí o importarlos desde otro archivo
const styles = StyleSheet.create({
    searchButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        backgroundColor: '#0000ff',
        borderRadius: 8,
        padding: 10,
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
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});