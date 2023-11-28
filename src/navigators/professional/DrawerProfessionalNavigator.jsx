import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AppointmentsStackNavigator from './AppointmentsStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import ProfileSalutiemStackNavigator from './ProfileSalutiemStackNavigator';

const Drawer = createDrawerNavigator();

const DrawerProfessionalNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Perfil Salutiem">
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
            <Drawer.Screen
                name="Perfil Salutiem"
                options={{ headerTitle: '' }} // Y aquí también
                component={ProfileSalutiemStackNavigator}
                listeners={({ navigation }) => ({
                    focus: () => navigation.navigate('ProfileSalutiem')
                })}
            />
        </Drawer.Navigator>
    );
};

export default DrawerProfessionalNavigator;
