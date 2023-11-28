import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { navigate } from '../../components/utilities/NavigationService.js';

const HomeScreen = ({ navigation }) => {
    const handleGoToProfile = () => {
        navigate('Turnos'); 
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a la Aplicación</Text>

            <Button
                title="Ver Lista de Turnos"
                onPress={() => navigate('Turnos')}
            />
            <Button
                title="Ver Mapa"
                onPress={() => navigation.navigate('MainStackNavigator', { screen: 'Map' })}
            />
            <Button
                title="Ver Perfil"
                onPress={handleGoToProfile}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        marginBottom: 20
    }
});

export default HomeScreen;
