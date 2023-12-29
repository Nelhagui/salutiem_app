import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SchedulesProvider } from '../../context/SchedulesContext';

import ProfileSalutiem from '../../../components/profile/professional/salutiem/ProfileSalutiem';
import EditProfileSalutiem from '../../../components/profile/professional/salutiem/EditProfileSalutiem';
import SaveProfileResultSalutiem from '../../../components/profile/professional/salutiem/SaveProfileResultSalutiem';
import EditSpecialties from '../../../components/profile/professional/salutiem/editSpecialties/EditSpecialties';
import EditSchedules from '../../../components/profile/professional/salutiem/EditSchedules/EditSchedules';
import AddressSearch from '../../../components/profile/professional/salutiem/addressSearch/AddressSearch';


const Stack = createStackNavigator();

const ProfileSalutiemStackNavigator = () => {
    return (
        <SchedulesProvider>
            <Stack.Navigator initialRouteName="ProfileSalutiem">
                <Stack.Screen
                    name="ProfileSalutiem"
                    component={ProfileSalutiem}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EditSpecialties"
                    component={EditSpecialties}
                    options={{ headerTitle: 'Editar', headerBackTitle: '' }}
                />
                <Stack.Screen
                    name="AddressSearch"
                    component={AddressSearch}
                    options={{ headerTitle: '', headerBackTitle: '' }}
                />
                <Stack.Screen
                    name="EditSchedules"
                    component={EditSchedules}
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
        </SchedulesProvider>
    );
}

export default ProfileSalutiemStackNavigator