import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Support from '../../../components/support/Support';


const Stack = createStackNavigator();

const SupportStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Support">
            <Stack.Screen
                name="Support"
                component={Support}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ headerTitle: '', headerBackTitle: '' }}
            />
            <Stack.Screen
                name="SaveProfileResult"
                component={SaveProfileResult}
                options={{ headerShown: false }}
            /> */}
        </Stack.Navigator>
    );
}

export default SupportStackNavigator