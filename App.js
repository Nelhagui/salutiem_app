import 'react-native-gesture-handler';
import React from 'react';
import { navigationRef } from './components/utilities/NavigationService.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MapComponent from './MapComponent';
import PointDetail from './PointDetail';
import ConfirmDateTimeScreen from './components/calendar/ConfirmDateTimeScreen';
import SuccessScreen from './components/calendar/SuccessScreen';
import Appointments from './components/appointments/user/Appointments';
import AppointmentDetails from './components/appointments/user/AppointmentDetails';
import CancellationResult from './components/appointments/user/CancellationResult';
import Profile from './components/profile/user/Profile';
import EditProfile from './components/profile/user/EditProfile';
import SaveProfileResult from './components/profile/user/SaveProfileResult';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Map">
            <Stack.Screen
                name="Map"
                component={MapComponent}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="PointDetail"
                component={PointDetail}
                options={{ headerTitle: '', headerBackTitle: '' }}
            />
            <Stack.Screen
                name="ConfirmDateTimeScreen"
                component={ConfirmDateTimeScreen}
                options={{ headerTitle: '', headerBackTitle: '' }}
            />
            <Stack.Screen
                name="SuccessScreen"
                component={SuccessScreen}
                options={{ headerTitle: '', headerBackTitle: '' }}
            />
        </Stack.Navigator>
    );
};

const AppointmentsStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Appointments">
            <Stack.Screen
                name="Appointments"
                component={Appointments}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AppointmentDetails"
                component={AppointmentDetails}
                options={{ headerTitle: '', headerBackTitle: '' }}
            />
            <Stack.Screen
                name="CancellationResult"
                component={CancellationResult}
                options={() => ({
                    header: () => null,
                    headerTitle: '',
                    headerBackTitle: ''
                })}
            />
        </Stack.Navigator>
    );
};

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SaveProfileResult"
                component={SaveProfileResult}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

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

    return (
        <NavigationContainer ref={navigationRef}>
            {isAuthenticated ? (
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen
                        name="Home"
                        options={{ headerTitle: '' }} // Y aquí también
                        component={MainStackNavigator}
                        listeners={({ navigation }) => ({
                            focus: () => navigation.navigate('Map')
                        })}
                    />
                    <Drawer.Screen
                        name="Turnos"
                        options={{ headerTitle: '' }} // Y aquí también
                        component={AppointmentsStackNavigator}
                        listeners={({ navigation }) => ({
                            focus: () => navigation.navigate('Appointments')
                        })}
                    />
                    <Drawer.Screen
                        name="Perfil"
                        options={{ headerTitle: '' }} // Y aquí también
                        component={ProfileStackNavigator}
                        listeners={({ navigation }) => ({
                            focus: () => navigation.navigate('Profile')
                        })}
                    />

                    {/* Puedes agregar más pantallas al Drawer aquí si es necesario */}
                </Drawer.Navigator>
            ) : (
                // Navegador de autenticación para login, registro, o invitado
                <AuthStackNavigator />
            )}
        </NavigationContainer>
    );
};

export default App;
