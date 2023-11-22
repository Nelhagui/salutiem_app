import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';

const RegisterScreen = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const isFormValid = () => {
        return (
            nombre !== '' &&
            apellido !== '' &&
            direccion !== '' &&
            email !== '' &&
            password !== '' &&
            password === repeatPassword
        );
    };

    const handleRegister = () => {
        setIsLoading(true);
        setTimeout(() => {
            // Simulación de éxito o fracaso del registro
            const registrationSuccess = true; // Cambiar según la lógica deseada

            if (registrationSuccess) {
                navigation.navigate('Verification');

            } else {
                setErrorMessage('Error en el registro. Inténtalo de nuevo.');
            }
            setIsLoading(false);
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>

            <TextInput
                style={styles.input}
                onChangeText={setNombre}
                value={nombre}
                placeholder="Nombre"
            />

            <TextInput
                style={styles.input}
                onChangeText={setApellido}
                value={apellido}
                placeholder="Apellido"
            />

            <TextInput
                style={styles.input}
                onChangeText={setDireccion}
                value={direccion}
                placeholder="Dirección"
            />

            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Contraseña"
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                onChangeText={setRepeatPassword}
                value={repeatPassword}
                placeholder="Repetir Contraseña"
                secureTextEntry
            />

            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button
                    title="Registrarse"
                    onPress={handleRegister}
                    disabled={!isFormValid()}
                />
            )}

            <Button
                title="¿Ya tienes cuenta? Inicia sesión"
                onPress={() => navigation.navigate('Login')}
                disabled={isLoading} // Deshabilita el botón mientras isLoading sea true
                color="#1E6738"
            />

            {errorMessage
                ? <>
                    <Text style={styles.error}>{errorMessage}</Text>
                </>
                : null}
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
});

export default RegisterScreen;
