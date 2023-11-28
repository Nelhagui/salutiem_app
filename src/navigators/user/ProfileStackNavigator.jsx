import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../../../components/profile/user/Profile';
import EditProfile from '../../../components/profile/user/EditProfile';
import SaveProfileResult from '../../../components/profile/user/SaveProfileResult';


const Stack = createStackNavigator();

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
}

export default ProfileStackNavigator