import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStackNavigator from './MainStackNavigator';
import AppointmentsStackNavigator from './AppointmentsStackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
                name="Home"
                options={{ headerTitle: '' }} // Y aquí también
                component={MainStackNavigator}
            />
            <Drawer.Screen
                name="Turnos"
                options={{ headerTitle: '' }} // Y aquí también
                component={AppointmentsStackNavigator}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
