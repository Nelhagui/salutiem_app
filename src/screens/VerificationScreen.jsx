import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

const VerificationScreen = ({ navigation }) => {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleVerification = () => {
        setIsLoading(true);
        setErrorMessage('');
        // Simular la verificación del código
        setTimeout(() => {
            const isCodeValid = true;
            setIsLoading(false);

            if (isCodeValid) {
                setVerificationSuccess(true);
                setErrorMessage('');
            } else {
                setErrorMessage('Código incorrecto. Inténtalo de nuevo.');
            }
        }, 2000); // Simula un proceso de verificación durante 2 segundos
    };

    const resendCode = () => {
        setIsLoading(true);
        setErrorMessage('');
        // Simular el reenvío del código
        setTimeout(() => {
            setIsLoading(false);
            // Aquí podrías actualizar el estado para indicar que el código fue reenviado
        }, 2000); // Simula el proceso de reenvío durante 2 segundos
    };

    if (verificationSuccess) {
        return (
            <View style={styles.centeredContainer}>
                <Text style={styles.successMessage}>Registro satisfactorio, bienvenido. Ahora puedes iniciar sesión.</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Ir a Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verificación de Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={setCode}
                value={code}
                placeholder="Código de Verificación"
                editable={!isLoading}
            />

            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button
                    title="Verificar"
                    onPress={handleVerification}
                    disabled={verificationSuccess}
                />
            )}

            {verificationSuccess && (
                <View>
                    <Text>Verificación completada. Puedes iniciar sesión.</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.link}>Ir a Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
            )}

            {errorMessage ? (
                <View>
                    <Text style={styles.error}>{errorMessage}</Text>
                    <TouchableOpacity onPress={resendCode} disabled={isLoading}>
                        <Text style={styles.link}>Reenviar Código</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    error: {
        textAlign: 'center',
        color: 'red',
        marginTop: 10,
    },
    link: {
        color: 'blue',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
    successMessage: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default VerificationScreen;
