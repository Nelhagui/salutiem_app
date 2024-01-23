import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Svg, { Path } from "react-native-svg"

const Profile = ({ navigation }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            const profileData = {
                name: "Nelson",
                apellido: "Aguiar",
                email: "nelson@example.com",
                direccion: "Calle Falsa 123",
                contraseña: "******", // Contraseña oculta
                foto: null // Reemplaza con la URL de la imagen
            }
            setData(profileData);
            setLoading(false);
        }, 2000); // 2 segundos de delay para simular la carga
    }, []);

    const handleEditPress = () => {
        navigation.navigate('EditProfile');
    };

    const UserImage = ({ uri }) => {
        if (uri) {
            return <Image source={{ uri }} style={styles.profileImage} />;
        } else {
            return (
                <Svg
                    width={100}
                    height={100}
                    viewBox="0 -960 960 960"
                >
                    <Path d="M248-250q55-36 110-56.5T480-327q67 0 122 20.5T712-250q43-45 68.5-103T806-480q0-136-95-231t-231-95q-136 0-231 95t-95 231q0 69 25.5 127T248-250Zm231.814-219Q432-469 399.5-501.686q-32.5-32.686-32.5-80.5t32.686-80.314q32.686-32.5 80.5-32.5t80.314 32.686q32.5 32.686 32.5 80.5T560.314-501.5q-32.686 32.5-80.5 32.5Zm-.219 337q-72.146 0-135.775-27-63.629-27-110.725-74.5Q186-281 159-343.841q-27-62.84-27-136.659 0-72.819 27-136.159Q186-680 233.5-727q47.5-47 110.341-74 62.84-27 136.659-27 72.819 0 136.159 27Q680-774 727-727q47 47 74 110.5t27 136.234q0 73.734-27 136.5Q774-281 727-233.5 680-186 616.371-159q-63.629 27-136.776 27Z" fill="#5f6367" />
                </Svg>
            );
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <UserImage uri={data.foto} />
                    <View style={{ width: '100%'}}>
                        <View style={styles.contentProfileText}>
                            <Text style={styles.labelProfileText}>Nombre</Text>
                            <Text style={styles.profileText}>{data.name}</Text>
                        </View>
                        <View style={styles.contentProfileText}>
                            <Text style={styles.labelProfileText}>Apellido</Text>
                            <Text style={styles.profileText}>{data.apellido}</Text>
                        </View>
                        <View style={styles.contentProfileText}>
                            <Text style={styles.labelProfileText}>Email</Text>
                            <Text style={styles.profileText}>{data.email}</Text>
                        </View>
                        <View style={styles.contentProfileText}>
                            <Text style={styles.labelProfileText}>Dirección</Text>
                            <Text style={styles.profileText}>{data.direccion}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleEditPress}>
                        <Text style={styles.buttonText}>Editar Perfil</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        padding: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    contentProfileText: {
        paddingVertical: 4,
        marginBottom: 7,
    },
    profileText: {
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
});

export default Profile;
