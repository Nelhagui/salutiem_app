import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, ActivityIndicator, Button } from 'react-native';

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
                foto: "https://tu-enlace-de-imagen.com/foto.jpg" // Reemplaza con la URL de la imagen
            }
            setData(profileData);
            setLoading(false);
        }, 2000); // 2 segundos de delay para simular la carga
    }, []);

    const handleEditPress = () => {
        navigation.navigate('EditProfile', { userData: data });
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <Image source={{ uri: data.foto }} style={styles.profileImage} />
                    <Text style={styles.profileText}>Nombre: {data.name}</Text>
                    <Text style={styles.profileText}>Apellido: {data.apellido}</Text>
                    <Text style={styles.profileText}>Email: {data.email}</Text>
                    <Text style={styles.profileText}>Dirección: {data.direccion}</Text>
                    <Text style={styles.profileText}>Contraseña: {data.contraseña}</Text>
                    <Button title="Editar Perfil" onPress={handleEditPress} />
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Puedes cambiar el color de fondo si lo deseas
    },
    contentContainer: {
        alignItems: 'center',
        paddingTop: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50, // Esto hará que la imagen sea circular
        marginBottom: 20,
    },
    profileText: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default Profile;
