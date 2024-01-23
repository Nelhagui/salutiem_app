import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DrawerUserNavigator from '../user/DrawerUserNavigator';
import DrawerProfessionalNavigator from '../professional/DrawerProfessionalNavigator';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import VerificationScreen from '../../screens/VerificationScreen';
import HomeScreen from '../../screens/HomeScreen';
import { useAuth } from '../../context/AuthContext';
import { LoginRegisterProvider } from '../../context/LoginRegisterContext';
import SearchAddressRegister from '../../../components/register/map/SearchAddressRegister';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
    return (
        <LoginRegisterProvider>
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
                    name="SearchAddressRegister"
                    component={SearchAddressRegister}
                    options={{ headerTitle: '', headerBackTitle: 'Atrás' }}
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
        </LoginRegisterProvider>
    );
};

const ContainerFilterAuth = () => {
    const { accessToken, isProfessional } = useAuth();
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