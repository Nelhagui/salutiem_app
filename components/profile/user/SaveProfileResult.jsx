import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SaveProfileResult = ({ route, navigation }) => {
    const { success } = route.params;
    const goToTurnsList = () => {
        navigation.navigate('Profile');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{success ? 'Guardado Exitoso' : 'Error al Cancelar'}</Text>
            <Button title="Volver" onPress={goToTurnsList} />
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // Puedes agregar más estilos aquí si lo necesitas
    },
    text: {
        // Estilos para el texto, si lo necesitas
    },
    // Puedes agregar estilos para el botón si lo deseas
});

export default SaveProfileResult;
