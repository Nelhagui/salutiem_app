import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { registerFetch } from '../services/servicesAuth';
import { useLoginRegister } from '../context/LoginRegisterContext';

const RegisterScreen = ({ navigation }) => {

    const { addressRegister } = useLoginRegister();
    const [enableButtonSave, setEnableButtonSave] = useState(false)
    const [errorMail, setErrorMail] = useState(false)
    const [errorPass, setErrorPass] = useState(false)
    const [selectRol, setSelectRol] = useState(false)
    const [isDoctor, setIsDoctor] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [dataForm, setDataForm] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        email: '',
        password: '',
        repeatPassword: ''
    })
    const [dataFormErrors, setDataFormErrors] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        email: '',
        password: '',
        repeatPassword: ''
    })


    const isFormValid = () => {
        return (
            dataForm.nombre !== '' &&
            dataForm.apellido !== '' &&
            dataForm.direccion !== '' &&
            dataForm.email !== '' &&
            dataForm.password !== '' &&
            dataForm.password === dataForm.repeatPassword
        );
    };

    const handleRegister = async () => {
        setIsSaving(true);
        setErrorMessage('');
        try {
            const response = await registerFetch(dataForm);
            const data = await response.json()
            if (response && response.status) {
                if (response.status === 422) {
                    handleErrorsFromServer(data?.errors);
                }
                else if (response.status === 200) {
                    navigation.navigate('Verification');
                } else {
                    setErrorMessage('Error inesperado, intente nuevamente por favor.');
                }
            } else {
                // Éxito, puedes utilizar los datos devueltos
                console.log('Éxito:', data);
            }
        } catch (error) {
            console.error('Error al obtener datos del perfil:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleErrorsFromServer = (errors) => {
        const updatedErrors = { ...dataFormErrors };
        // Iterar sobre las keys del objeto de errores y actualizar el estado correspondiente
        Object.keys(errors).forEach((key) => {
            if (dataFormErrors[key] !== undefined) {
                updatedErrors[key] = errors[key];
            }
        });
        // Actualizar el estado con los nuevos errores
        setDataFormErrors(updatedErrors);
    };

    const handleInputChange = (name, value) => {
        setDataForm({
            ...dataForm,
            [name]: value,
        });

        // Limpiar el error cuando el usuario comienza a escribir en el campo
        setDataFormErrors({
            ...dataFormErrors,
            [name]: '',
        });
    };

    const navigateToStackSearch = () => {
        navigation.navigate('SearchAddressRegister');
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {selectRol
                ?
                <View style={styles.container}>
                    <Text style={styles.title}>Registro</Text>
                    <Text>{isDoctor ? 'Profesional' : 'Paciente'}</Text>

                    <View style={{ width: '100%', marginBottom: 4 }}>
                        <TextInput
                            mode='outlined'
                            style={styles.input}
                            onChangeText={(text) => handleInputChange("nombre", text)}
                            defaultValue={dataForm?.nombre}
                            label="Nombre"
                            editable={!isSaving}
                            error={errorMail}
                        />
                        <Text style={{ marginLeft: 5, color: 'red' }}>{errorMail}</Text>
                    </View>

                    <View style={{ width: '100%', marginBottom: 4 }}>
                        <TextInput
                            mode='outlined'
                            style={styles.input}
                            onChangeText={(text) => handleInputChange("apellido", text)}
                            defaultValue={dataForm?.apellido}
                            label="Apellido"
                            editable={!isSaving}
                            error={errorMail}
                        />
                        <Text style={{ marginLeft: 5, color: 'red' }}>{errorMail}</Text>
                    </View>

                    <View style={{ width: '100%', marginBottom: 4 }}>
                        <TextInput
                            mode='outlined'
                            label="Dirección"
                            textAlign={'left'}
                            textAlignVertical={'center'}
                            style={styles.input}
                            multiline={true}
                            value={addressRegister}
                            onFocus={navigateToStackSearch}
                            editable={!isSaving}
                            error={errorMail}
                        />
                        <Text style={{ marginLeft: 5, color: 'red' }}>{errorMail}</Text>
                    </View>

                    <View style={{ width: '100%', marginBottom: 4 }}>
                        <TextInput
                            mode='outlined'
                            style={styles.input}
                            onChangeText={(text) => handleInputChange("email", text)}
                            defaultValue={dataForm?.email}
                            label="email"
                            keyboardType="email-address"
                            editable={!isSaving}
                            error={errorMail}
                        />
                        <Text style={{ marginLeft: 5, color: 'red' }}>{errorMail}</Text>
                    </View>

                    <View style={{ width: '100%', marginBottom: 4 }}>
                        <TextInput
                            mode='outlined'
                            style={styles.input}
                            onChangeText={(text) => handleInputChange("password", text)}
                            defaultValue={dataForm?.password}
                            label="Contraseña"
                            keyboardType="email-address"
                            editable={!isSaving}
                            error={errorMail}
                            secureTextEntry
                        />
                        <Text style={{ marginLeft: 5, color: 'red' }}>{errorMail}</Text>
                    </View>

                    <View style={{ width: '100%', marginBottom: 4 }}>
                        <TextInput
                            mode='outlined'
                            style={styles.input}
                            onChangeText={(text) => handleInputChange("repeatPassword", text)}
                            defaultValue={dataForm?.repeatPassword}
                            label="Repetir Contraseña"
                            keyboardType="email-address"
                            editable={!isSaving}
                            error={errorMail}
                            secureTextEntry
                        />
                        <Text style={{ marginLeft: 5, color: 'red' }}>{errorMail}</Text>
                    </View>
                    {
                        errorMessage
                            ? <Text style={styles.error}>{errorMessage}</Text>
                            : null
                    }

                    <TouchableOpacity
                        style={
                            isFormValid() && !isSaving
                                ? styles.button
                                : styles.buttonDisabled
                        }
                        onPress={handleRegister}
                        disabled={!isFormValid() && isSaving}
                    >
                        {
                            isSaving
                                ? <Text style={styles.buttonText}>Procesando...</Text>
                                :
                                <TouchableOpacity style={styles.button} onPress={() => null} disabled={isSaving}>
                                    <Text style={styles.buttonText}>Registrarse</Text>
                                </TouchableOpacity>
                        }

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginTop: 30 }}
                        onPress={() => navigation.navigate('Login')}
                        disabled={isSaving}
                    >
                        <Text style={styles.buttonLink}>¿Ya tienes cuenta? Inicia sesión</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { setIsDoctor(false); setSelectRol(true) }}
                        disabled={isSaving}
                    >
                        <Text style={styles.buttonText}>Soy Paciente</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { setIsDoctor(true); setSelectRol(true) }}
                        disabled={isSaving}
                    >
                        <Text style={styles.buttonText}>Soy Médico</Text>
                    </TouchableOpacity>
                </View>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '100%'
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

export default RegisterScreen;
