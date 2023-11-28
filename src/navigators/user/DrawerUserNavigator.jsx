import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainStackNavigator from './MainStackNavigator';
import AppointmentsStackNavigator from './AppointmentsStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

const Drawer = createDrawerNavigator();

const DrawerUserNavigator = () => {
    return (
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
        </Drawer.Navigator>
    );
};

export default DrawerUserNavigator;
