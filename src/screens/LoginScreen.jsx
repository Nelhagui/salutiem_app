import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useFocusEffect(
        React.useCallback(() => {
            // Restablece el mensaje de error cada vez que la pantalla se enfoca
            setErrorMessage('');
        }, [])
    );

    const handleLogin = () => {
        setIsLoading(true);
        setErrorMessage('');
        setTimeout(() => {
            setIsLoading(false);
            if (email === "usuario@example.com" && password === "contrasenia123") {
                // Aquí manejas el inicio de sesión exitoso
                // Por ejemplo, puedes navegar a la pantalla principal o a otra pantalla
                navigation.navigate('Home'); // Asegúrate de que 'Home' es el nombre correcto de tu pantalla
            } else {
                setErrorMessage('Error: Usuario o contraseña incorrectos');
            }
        }, 2000);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
                editable={!isLoading}
            />

            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Contraseña"
                secureTextEntry
                editable={!isLoading}
            />

            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                    <Button
                        title="Iniciar Sesión"
                        onPress={handleLogin}
                    />

                    <Button
                        title="Ingresar como invitado"
                        onPress={() => navigation.navigate('Guest')}
                    />

                    <Button
                        title="Crear una cuenta"
                        onPress={() => navigation.navigate('Register')}
                    />
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
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});

export default LoginScreen;

