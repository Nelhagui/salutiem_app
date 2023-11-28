import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EditProfileSalutiem = ({ route, navigation }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [userData, setUserData] = useState({
        miniBio: '',
        domicilioConsultorioPrincipal: '',
        domicilioConsultorioSecundario: '',
        precioConsultaVirtual: '',
        precioConsultaPresencial: '',
        especialidades: '',
        cuentaMP: '',
    });

    // Mini Bio: 
    // Domicilio Consultario Principal: 
    // Domicilio Consultario Secundario: 
    // Precio Consulta Virtual: 
    // Precio Consulta Presencial: 
    // Especialidades: 
    // Cueta de MercadoPago: 
    // Estado del Perfil: 
    // Estado de la Suscripción: 

    useEffect(() => {
        if (route.params?.userData) {
            setUserData(route.params.userData);
        }
    }, [route.params?.userData]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setUserData({ ...userData, foto: result.uri });
        }
    };

    const handleSave = () => {
        setIsSaving(true); // Deshabilitar el botón
        // Simula una petición al backend
        setTimeout(() => {
            setIsSaving(false); // Habilitar el botón
            // Aquí decides si fue exitoso o no y navegas a la pantalla correspondiente
            navigation.navigate('SaveProfileResultSalutiem', { success: true });
        }, 2000); // 2 segundos de delay para simular la petición
    };

    return (
        <View style={styles.container}>
            <View style={styles.photoContainer}>
                <Image
                    source={{ uri: userData.foto || 'https://via.placeholder.com/100' }}
                    style={styles.profileImage}
                />
                <TouchableOpacity onPress={pickImage}>
                    <Text style={styles.changePhotoText}>Perfil Salutiem</Text>
                </TouchableOpacity>
            </View>
            
            <TextInput
                style={styles.textArea}
                multiline
                numberOfLines={4}
                onChangeText={(text) => setUserData({ ...userData, name: text })}
                value={userData.minibio}
                placeholder="Mini Bio"
            />

            <TextInput
                style={styles.input}
                onChangeText={(text) => setUserData({ ...userData, apellido: text })}
                value={userData.domicilioConsultorioPrincipal}
                placeholder="Domicilio Principal"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setUserData({ ...userData, apellido: text })}
                value={userData.domicilioConsultorioSecundario}
                placeholder="Domicilio Secundario"
            />

            <TextInput
                style={styles.input}
                onChangeText={(text) => setUserData({ ...userData, contraseña: text })}
                value={userData.precioConsultaVirtual}
                placeholder="Precio Consulta Virtual"
            />
            <TextInput
                style={styles.input}
                onChangeText={(text) => setUserData({ ...userData, contraseña: text })}
                value={userData.precioConsultaPresencial}
                placeholder="Precio Consulta Presencial"
            />
            <Text>Especialidades</Text>
            {isSaving ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Guardar Cambios" onPress={handleSave} disabled={isSaving} />
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
        backgroundColor: '#f5f5f5',
    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e1e1e1',
    },
    changePhotoText: {
        color: '#0000ff',
        marginTop: 10,
    },
    input: {
        height: 40,
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    textArea: {
        height: 100, // Ajusta la altura según sea necesario
        width: '100%', // Ajusta el ancho según sea necesario
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top', // Asegura que el texto comience desde la parte superior
    },
});

export default EditProfileSalutiem;
