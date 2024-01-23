import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../../../components/profile/user/Profile';
import EditProfile from '../../../components/profile/user/EditProfile';
import SaveProfileResult from '../../../components/profile/user/SaveProfileResult';
import SearchAddressUser from '../../../components/profile/user/map/SearchAddressUser';
import { UserProvider } from '../../context/UserContext';


const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
    return (
        <UserProvider>
            <Stack.Navigator initialRouteName="Profile">
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={EditProfile}
                    options={{ headerTitle: '', headerBackTitle: 'Atras' }}
                />
                <Stack.Screen
                    name="SearchAddressUser"
                    component={SearchAddressUser}
                    options={{ headerTitle: '', headerBackTitle: 'Volver' }}
                />
                <Stack.Screen
                    name="SaveProfileResult"
                    component={SaveProfileResult}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </UserProvider>
    );
}

export default ProfileStackNavigator