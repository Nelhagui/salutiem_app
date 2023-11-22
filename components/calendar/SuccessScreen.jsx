import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SuccessScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Proceso completado satisfactoriamente</Text>
            <Button title="Volver a los turnos" onPress={() => navigation.navigate('TurnosScreen')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default SuccessScreen;
