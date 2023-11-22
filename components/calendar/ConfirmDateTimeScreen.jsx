import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ConfirmDateTimeScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const { date, time } = route.params;

    const handleConfirm = () => {
        setIsLoading(true);
        // Simulación de envío de datos
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('SuccessScreen');
        }, 2000); // Simula un retraso de 2 segundos
    };

    return (
        <View style={styles.container}>
            <Text>Fecha: {date}</Text>
            <Text>Hora: {time}</Text>
            <TextInput placeholder="Número de tarjeta" value={cardNumber} onChangeText={setCardNumber} />
            <TextInput placeholder="Fecha de vencimiento" value={expiryDate} onChangeText={setExpiryDate} />
            <TextInput placeholder="CVV" value={cvv} onChangeText={setCvv} />
            <Button title="Confirmar" onPress={handleConfirm} disabled={isLoading} />
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

export default ConfirmDateTimeScreen;
