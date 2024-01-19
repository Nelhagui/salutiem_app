import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapComponent from '../../../components/map/MapComponent';
import PointDetail from '../../../PointDetail';
import ConfirmDateTimeScreen from '../../../components/calendar/ConfirmDateTimeScreen';
import SuccessScreen from '../../../components/calendar/SuccessScreen';
import SearchSpecialties from '../../../components/map/SearchSpecialties';

import { MapProvider } from '../../context/MapContext';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <MapProvider>
            <Stack.Navigator initialRouteName="Map">
                <Stack.Screen
                    name="Map"
                    component={MapComponent}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SearchSpecialties"
                    component={SearchSpecialties}
                    options={{ headerTitle: '', headerBackTitle: 'Atras' }}
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
        </MapProvider>
    );
};

export default MainStackNavigator;
