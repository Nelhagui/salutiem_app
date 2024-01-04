import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { loginFetch } from '../services/servicesAuth';
import { TextInput } from 'react-native-paper';


const LoginScreen = ({ navigation }) => {
    const { setCredentials } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMail, setErrorMail] = useState(false)
    const [errorPass, setErrorPass] = useState(false)

    useFocusEffect(
        React.useCallback(() => {
            // Restablece el mensaje de error cada vez que la pantalla se enfoca
            setErrorMessage('');
        }, [])
    );

    const handleLogin = async () => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const response = await loginFetch(email, password);
            const data = await response.json()
            // Verificar el status en la respuesta
            if (response && response.status) {
                if (response.status === 422) {
                    // Manejar error de validación
                    if (data?.errors?.email || data?.errors?.password) {
                        setErrorMail(data?.errors?.email);
                        setErrorPass(data?.errors?.password);
                    } else {
                        setErrorMessage('Error inesperado, intente nuevamente por favor');
                    }
                } 
                else if(response.status === 200){
                    if(data?.token && data.user && data?.esMedico)
                        setCredentials(data);
                    else
                        setErrorMessage('Error inesperado, intente nuevamente por favor.');
                } else {
                    // Otro manejo de errores según el status
                    setErrorMessage('Error inesperado, intente nuevamente por favor.');
                }
            } else {
                // Éxito, puedes utilizar los datos devueltos
                console.log('Éxito:', data);
            }
        } catch (error) {
            console.error('Error al obtener datos del perfil:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailChange = (text) => {
        setEmail(text);
        setErrorMail(false);
    };

    const handlePassChange = (text) => {
        setPassword(text);
        setErrorPass(false);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={{ width: '100%', marginBottom: 7 }}>
                <TextInput
                    mode='outlined'
                    style={styles.input}
                    onChangeText={handleEmailChange}
                    value={email}
                    label="Email"
                    keyboardType="email-address"
                    editable={!isLoading}
                    error={errorMail}
                />
                <Text style={{ marginLeft: 5, color: 'red' }}>{errorMail}</Text>
            </View>

            <View style={{ width: '100%', marginBottom: 10 }}>
                <TextInput
                    mode='outlined'
                    style={styles.input}
                    onChangeText={handlePassChange}
                    value={password}
                    label="Contraseña"
                    secureTextEntry
                    editable={!isLoading}
                    error={errorPass}
                />
                <Text style={{ marginLeft: 5, color: 'red' }}>{errorPass}</Text>
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                    {/* <Button
                        title="Ingresar como invitado"
                        onPress={() => navigation.navigate('Guest')}
                    /> */}
                    <TouchableOpacity style={{marginTop: 30}} onPress={() => navigation.navigate('Register')} disabled={isLoading}>
                        <Text style={styles.buttonLink}>Crear una cuenta</Text>
                    </TouchableOpacity>
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
        marginBottom: 4,
    },
    button: {
        marginTop: 40,
        width: '100%',
        backgroundColor: '#27b4e4', // Color de fondo
        padding: 10, // Relleno
        borderRadius: 5, // Bordes redondeados
        alignItems: 'center', // Alineación del texto en el botón
    },
    buttonText: {
        color: 'white', // Color del texto
        fontSize: 16, // Tamaño del texto
    },

    buttonText: {
        color: 'white', // Color del texto
        fontSize: 16, // Tamaño del texto
    },
    buttonLink: {
        textDecorationLine: 'underline',

    }
});

export default LoginScreen;

