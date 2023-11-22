import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Appointments from '../screens/appointments/user/Appointments';
import AppointmentDetails from '../screens/appointments/user/AppointmentDetails';
import CancellationResult from '../screens/appointments/user/CancellationResult';

const Stack = createStackNavigator();

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

export default AppointmentsStackNavigator;
