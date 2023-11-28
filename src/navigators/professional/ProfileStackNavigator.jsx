import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileProfessional from '../../../components/profile/professional/ProfileProfessional';
import EditProfileProfessional from '../../../components/profile/professional/EditProfileProfessional';
import SaveProfileProfessionalResult from '../../../components/profile/professional/SaveProfileProfessionalResult';


const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen
                name="Profile"
                component={ProfileProfessional}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileProfessional}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SaveProfileResult"
                component={SaveProfileProfessionalResult}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default ProfileStackNavigator