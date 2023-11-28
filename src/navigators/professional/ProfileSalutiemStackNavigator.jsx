import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileSalutiem from '../../../components/profile/professional/salutiem/ProfileSalutiem';
import EditProfileSalutiem from '../../../components/profile/professional/salutiem/EditProfileSalutiem';
import SaveProfileResultSalutiem from '../../../components/profile/professional/salutiem/SaveProfileResultSalutiem';
import EditSpecialties from '../../../components/profile/professional/salutiem/editSpecialties/EditSpecialties';


const Stack = createStackNavigator();

const ProfileSalutiemStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="ProfileSalutiem">
            <Stack.Screen
                name="ProfileSalutiem"
                component={ProfileSalutiem}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditSpecialties"
                component={EditSpecialties}
                options={{ headerTitle: '', headerBackTitle: '' }}
            />
            <Stack.Screen
                name="EditProfileSalutiem"
                component={EditProfileSalutiem}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SaveProfileResultSalutiem"
                component={SaveProfileResultSalutiem}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default ProfileSalutiemStackNavigator