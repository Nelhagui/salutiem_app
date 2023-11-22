import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapComponent from '../screens/MapComponent';
import PointDetail from '../screens/PointDetail';
import ConfirmDateTimeScreen from '../screens/calendar/ConfirmDateTimeScreen';
import SuccessScreen from '../screens/calendar/SuccessScreen';

const Stack = createStackNavigator();

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

export default MainStackNavigator;
