import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AppointmentsProfessional from '../../../components/appointments/professional/AppointmentsProfessional';
import AppointmentDetailsProfessional from '../../../components/appointments/professional/AppointmentDetailsProfessional';
import CancellationResultProfessional from '../../../components/appointments/professional/CancellationResultProfessional';

const Stack = createStackNavigator();

const AppointmentsStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Appointments">
            <Stack.Screen
                name="Appointments"
                component={AppointmentsProfessional}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AppointmentDetails"
                component={AppointmentDetailsProfessional}
                options={{ headerTitle: '', headerBackTitle: '' }}
            />
            <Stack.Screen
                name="CancellationResult"
                component={CancellationResultProfessional}
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
