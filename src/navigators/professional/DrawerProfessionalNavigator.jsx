import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

import { View, Text } from 'react-native';
import AppointmentsStackNavigator from './AppointmentsStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import ProfileSalutiemStackNavigator from './ProfileSalutiemStackNavigator';
import { useAuth } from '../../context/AuthContext';

import Svg, { Path } from "react-native-svg"

const Drawer = createDrawerNavigator();


const DummyComponent = () => null;
const CustomDrawerContent = (props) => {
    const { user } = useAuth();
    return (
        <DrawerContentScrollView {...props}>
            <View style={{ alignItems: 'center', padding: 20 }}>
                <Svg
                    width={88}
                    height={88}
                    viewBox="0 -960 960 960"
                >
                    <Path d="M248-250q55-36 110-56.5T480-327q67 0 122 20.5T712-250q43-45 68.5-103T806-480q0-136-95-231t-231-95q-136 0-231 95t-95 231q0 69 25.5 127T248-250Zm231.814-219Q432-469 399.5-501.686q-32.5-32.686-32.5-80.5t32.686-80.314q32.686-32.5 80.5-32.5t80.314 32.686q32.5 32.686 32.5 80.5T560.314-501.5q-32.686 32.5-80.5 32.5Zm-.219 337q-72.146 0-135.775-27-63.629-27-110.725-74.5Q186-281 159-343.841q-27-62.84-27-136.659 0-72.819 27-136.159Q186-680 233.5-727q47.5-47 110.341-74 62.84-27 136.659-27 72.819 0 136.159 27Q680-774 727-727q47 47 74 110.5t27 136.234q0 73.734-27 136.5Q774-281 727-233.5 680-186 616.371-159q-63.629 27-136.776 27Z" fill="#5f6367" />
                </Svg>
                <Text style={{ marginTop: 10, fontWeight: 'bold', color: '#3a3c3e' }}>
                    {user?.nombre} {user?.apellido}
                </Text>
                <Text>{user?.email}</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

const DrawerProfessionalNavigator = () => {
    const { logout } = useAuth();
    const handleLogout = () => {
        // Llama a la función logout desde el contexto
        logout();
      };
    return (
        <Drawer.Navigator
            initialRouteName="Perfil Salutiem"
            contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="Turnos"
                options={{
                    drawerLabel: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Svg
                                width={28}
                                height={28}
                                marginRight={5}
                                viewBox="0 -960 960 960"
                            >
                                <Path d="M384.693-208.385v-45.384h435.306v45.384H384.693Zm0-248.923v-45.384h435.306v45.384H384.693Zm0-249.538v-45.384h435.306v45.384H384.693ZM198.65-174.078q-24.069 0-41.051-16.392-16.982-16.391-16.982-40.492 0-24.1 16.699-40.8 16.699-16.699 40.8-16.699 24.101 0 40.492 17.174Q255-254.112 255-230.269q0 23.018-16.553 39.604-16.553 16.587-39.797 16.587Zm0-248.923q-24.069 0-41.051-16.88-16.982-16.881-16.982-40.119t17.06-40.119q17.06-16.88 41.017-16.88 23.132 0 39.719 16.88Q255-503.238 255-480t-16.553 40.119q-16.553 16.88-39.797 16.88Zm-1.034-249.538q-23.238 0-40.119-16.88-16.88-16.881-16.88-40.119t16.88-40.119q16.881-16.88 40.311-16.88 23.431 0 40.311 16.88Q255-752.776 255-729.538t-16.857 40.119q-16.856 16.88-40.527 16.88Z" fill="#5f6367" />
                            </Svg>
                            <Text>Últimos turnos</Text>
                        </View>
                    ),
                    headerTitle: ''
                }}
                component={AppointmentsStackNavigator}
                listeners={({ navigation }) => ({
                    focus: () => navigation.navigate('Appointments')
                })}
            />
            <Drawer.Screen
                name="Perfil"
                options={{
                    drawerLabel: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Svg
                                width={28}
                                height={28}
                                marginRight={5}
                                viewBox="0 -960 960 960"
                            >
                                <Path d="M480-492.924q-57.749 0-95.22-37.471t-37.471-95.22q0-58.134 37.471-95.413 37.471-37.278 95.22-37.278t95.22 37.278q37.471 37.279 37.471 95.413 0 57.749-37.471 95.22T480-492.924Zm-299.999 305.23v-75.922q0-32.23 17.077-56.153 17.077-23.923 44.385-36.769 63.153-28.077 121.768-42.308 58.615-14.23 116.769-14.23t116.461 14.538q58.308 14.538 121.461 42 27.923 12.846 45 36.769t17.077 56.153v75.922H180.001Z" fill="#5f6367" />
                            </Svg>
                            <Text>Perfil</Text>
                        </View>
                    ),
                    headerTitle: ''
                }}
                component={ProfileStackNavigator}
                listeners={({ navigation }) => ({
                    focus: () => navigation.navigate('Profile')
                })}
            />
            <Drawer.Screen
                name="Perfil Salutiem"
                options={{
                    drawerLabel: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Svg
                                width={28}
                                height={28}
                                marginRight={5}
                                viewBox="0 -960 960 960"
                            >
                                <Path d="M680-320q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480q-17 0-28.5 11.5T640-440q0 17 11.5 28.5T680-400ZM440-40v-116q0-21 10-39.5t28-29.5q32-19 67.5-31.5T618-275l62 75 62-75q37 6 72 18.5t67 31.5q18 11 28.5 29.5T920-156v116H440Zm79-80h123l-54-66q-18 5-35 13t-34 17v36Zm199 0h122v-36q-16-10-33-17.5T772-186l-54 66Zm-76 0Zm76 0Zm-518 0q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v200q-16-20-35-38t-45-24v-138H200v560h166q-3 11-4.5 22t-1.5 22v36H200Zm80-480h280q26-20 57-30t63-10v-40H280v80Zm0 160h200q0-21 4.5-41t12.5-39H280v80Zm0 160h138q11-9 23.5-16t25.5-13v-51H280v80Zm-80 80v-560 137-17 440Zm480-240Z" fill="#5f6367" />
                            </Svg>
                            <Text>Perfil Salutiem</Text>
                        </View>
                    ),
                    headerTitle: ''
                }}
                component={ProfileSalutiemStackNavigator}
                listeners={({ navigation }) => ({
                    focus: () => navigation.navigate('ProfileSalutiem')
                })}
            />
            <Drawer.Screen
                name="Cerrar Sesión"
                options={{
                    drawerLabel: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10' }}>
                            <Svg
                                width={28}
                                height={28}
                                marginRight={5}
                                viewBox="0 -960 960 960"
                            >
                                <Path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" fill="#5f6367" />
                            </Svg>
                            <Text onPress={handleLogout}>Cerrar Sesión</Text>
                        </View>
                    ),
                    headerTitle: ''
                }}
                // Agrega una acción al presionar el elemento del menú
                component={DummyComponent}
            />
        </Drawer.Navigator>
    );
};

export default DrawerProfessionalNavigator;
