import React, { useState, useEffect } from 'react';
import { TextInput, Text, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

const ProfileProfessional = ({ navigation }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [sexo, setSexo] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [paisNacimiento, setPaisNacimiento] = useState('');


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
                <ScrollView style={styles.container}>
                    <View style={{}}>
                        <Text style={styles.subtitle}>Datos Personales</Text>
                        <TextInput
                            label="Nombre"
                            value={nombre}
                            onChangeText={text => setNombre(text)}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />
                        <TextInput
                            label="Apellido"
                            value={apellido}
                            onChangeText={text => setApellido(text)}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />

                        <TextInput
                            label="Celular"
                            value={celular}
                            onChangeText={text => setCelular(text)}
                            mode="outlined"
                            style={{ marginBottom: 10 }}
                        />

                        <Picker
                            selectedValue={sexo}
                            onValueChange={(itemValue, itemIndex) => setSexo(itemValue)}
                            mode="dropdown" // Android only
                            style={{ marginBottom: 10 }}
                        >
                            <Picker.Item label="Seleccione una opción" value="" />
                            <Picker.Item label="Masculino" value="masculino" />
                            <Picker.Item label="Femenino" value="femenino" />
                            <Picker.Item label="Otro" value="otro" />
                        </Picker>
                    </View>
                    <Button
                        mode="contained"
                        onPress={() => console.log('Enviar formulario')}>
                        Enviar
                    </Button>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // No necesitas justifyContent ni alignItems aquí si quieres que los hijos ocupen todo el ancho
        backgroundColor: '#f5f5f5',
        padding: 10
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
    subtitle: {
        fontSize: 24
    }
});

export default ProfileProfessional;
