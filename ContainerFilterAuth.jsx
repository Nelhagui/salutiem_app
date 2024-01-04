import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DrawerUserNavigator from './src/navigators/user/DrawerUserNavigator';
import DrawerProfessionalNavigator from './src/navigators/professional/DrawerProfessionalNavigator';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import HomeScreen from './src/screens/HomeScreen';
import { useAuth } from './src/context/AuthContext';

const Stack = createStackNavigator();

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

const ContainerFilterAuth = () => {
    const {accessToken, isProfessional} = useAuth();
    return (
        <NavigationContainer>
            {accessToken ? (
                isProfessional
                    ? <DrawerProfessionalNavigator />
                    : <DrawerUserNavigator />
            ) : (
                <AuthStackNavigator />
            )}
        </NavigationContainer>
    );
};

export default ContainerFilterAuth