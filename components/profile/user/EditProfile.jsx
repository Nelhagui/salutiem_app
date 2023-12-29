import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = ({ route, navigation }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        apellido: '',
        email: '',
        direccion: '',
        contrasenia: '',
        nuevaContrasenia: '',
        repetirContrasenia: '',
        foto: '',
    });

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
            navigation.navigate('SaveProfileResult', { success: true });
        }, 2000); // 2 segundos de delay para simular la petición
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.photoContainer}>
                    <Image
                        source={{ uri: userData.foto || 'https://via.placeholder.com/100' }}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity onPress={pickImage}>
                        <Text style={styles.changePhotoText}>Cambiar foto</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.contentProfileText}>
                    <Text style={styles.labelProfileText}>Nombre</Text>
                    <TextInput
                        style={styles.profileText}
                        onChangeText={(text) => setUserData({ ...userData, name: text })}
                        value={userData.name}
                        placeholder="Nombre"
                    />
                </View>
                <View style={styles.contentProfileText}>
                    <Text style={styles.labelProfileText}>Apellido</Text>
                    <TextInput
                        style={styles.profileText}
                        onChangeText={(text) => setUserData({ ...userData, apellido: text })}
                        value={userData.apellido}
                        placeholder="Apellido"
                    />
                </View>
                <View style={styles.contentProfileText}>
                    <Text style={styles.labelProfileText}>Dirección</Text>
                    <TextInput
                        style={styles.profileText}
                        onChangeText={(text) => setUserData({ ...userData, direccion: text })}
                        value={userData.direccion}
                        placeholder="Dirección"
                    />
                </View>
                <View style={{ width: '100%', marginTop: 9 }}>
                    <Text style={{ fontSize: 17, fontWeight: '400', marginBottom: 5 }}>Cambiar contraseña</Text>
                    <View style={styles.contentProfileText}>
                        <Text style={styles.labelProfileText}>Actual</Text>
                        <TextInput
                            style={styles.profileText}
                            onChangeText={(text) => setUserData({ ...userData, contrasenia: text })}
                            value={userData.contrasenia}
                            placeholder="Contraseña"
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.contentProfileText}>
                        <Text style={styles.labelProfileText}>Nueva contraseña</Text>
                        <TextInput
                            style={styles.profileText}
                            onChangeText={(text) => setUserData({ ...userData, nuevaContrasenia: text })}
                            value={userData.contrasenia}
                            placeholder="Contraseña"
                            autoCompleteType="off"
                            textContentType="none"
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.contentProfileText}>
                        <Text style={styles.labelProfileText}>Repetir nueva contraseña</Text>
                        <TextInput
                            style={styles.profileText}
                            onChangeText={(text) => setUserData({ ...userData, repetirContrasenia: text })}
                            value={userData.contrasenia}
                            placeholder="Contraseña"
                            secureTextEntry
                        />
                    </View>
                </View>
                {isSaving ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleSave} disabled={isSaving}>
                        <Text style={styles.buttonText}>Guardar cambios</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
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
    contentProfileText: {
        paddingVertical: 4,
        marginBottom: 7,
        width: '100%',
    },
    profileText: {
        width: '100%',
        fontWeight: '400',
        fontSize: 16,
        color: '#383b3d',
        borderWidth: 0.4,
        padding: 10,
        borderRadius: 6,
        borderBottomColor: '#5f6367',
    },
    labelProfileText: {
        fontSize: 13,
        color: '#5f6367',
        marginBottom: 4,
    },
});

export default EditProfile;
