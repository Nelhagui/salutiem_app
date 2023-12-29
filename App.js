import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import HomeScreen from './src/screens/HomeScreen';
import DrawerUserNavigator from './src/navigators/user/DrawerUserNavigator';
import DrawerProfessionalNavigator from './src/navigators/professional/DrawerProfessionalNavigator';

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Verification"
                component={VerificationScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            {/* Otras pantallas relacionadas con la autenticación */}
        </Stack.Navigator>
    );
};

const App = () => {
    // Aquí iría tu lógica para determinar si el usuario está autenticado o no
    const isAuthenticated = true; // Esto es solo un ejemplo
    const isProfessional = true;
    return (
        <NavigationContainer>
            {isAuthenticated ? (
                isProfessional
                    ? <DrawerProfessionalNavigator />
                    : <DrawerUserNavigator />
            ) : (
                <AuthStackNavigator />
            )}
        </NavigationContainer>
    );
};

export default App;
