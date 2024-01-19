import React from 'react';
import { View, Text, Image, Share, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Svg, { Path } from "react-native-svg"


import MainStackNavigator from './MainStackNavigator';
import AppointmentsStackNavigator from './AppointmentsStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import SupportStackNavigator from './SupportStackNavigator';
import { useAuth } from '../../context/AuthContext';


const Drawer = createDrawerNavigator();

const shareInvite = async () => {
    try {
        const result = await Share.share({
            message: '¡Mira esta increíble aplicación! [Aquí tu URL]',
            // Puedes agregar la URL que quieres compartir en el mensaje.
        });

        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // compartido con actividad de tipo result.activityType
            } else {
                // compartido
            }
        } else if (result.action === Share.dismissedAction) {
            // descartado
        }
    } catch (error) {
        alert(error.message);
    }
};

const DummyComponent = () => null;
const CustomDrawerContent = (props) => {
    const { user} = useAuth()
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

const DrawerUserNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="Home"
                options={{
                    drawerLabel: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Svg
                                width={28}
                                height={28}
                                marginRight={5}
                                viewBox="0 -960 960 960"
                            >
                                <Path d="M440-518q-42.55 0-73.775-31.225Q335-580.45 335-623q0-42.55 31.225-73.775Q397.45-728 440-728q42.55 0 73.775 31.225Q545-665.55 545-623q0 42.55-31.225 73.775Q482.55-518 440-518Zm402 416L739-206q-20 15-40.5 21t-38.294 6Q609-179 574-214.235q-35-35.236-35-86Q539-351 574.235-386q35.236-35 86-35Q711-421 746-385.833q35 35.166 35 85.833 0 18-5.5 38.5T754-221l104 103-16 16Zm-182-99q42 0 70.5-28.5T759-300q0-42-28.5-70.5T660-399q-42 0-70.5 28.5T561-300q0 42 28.5 70.5T660-201ZM492-400q-20 43-24.5 84t10.5 84H172v-47q0-24 13.5-41.5T223-351q40-19 113.5-38.5T492-400Z" fill="#5f6367" />
                            </Svg>
                            <Text>Buscar especialidad</Text>
                        </View>
                    ),
                    headerTitle: ''
                }}
                component={MainStackNavigator}
                listeners={({ navigation }) => ({
                    focus: () => navigation.navigate('Map')
                })}
            />
            <Drawer.Screen
                name="Últimos turnos"
                // options={{ headerTitle: '' }} // Y aquí también
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
                name="Mi cuenta"
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
                            <Text>Mi cuenta</Text>
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
                name="Invitar amigos"
                options={{
                    drawerLabel: () => (
                        <TouchableOpacity
                            onPress={shareInvite}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Svg
                                    width={28}
                                    height={28}
                                    marginRight={5}
                                    viewBox="0 -960 960 960"
                                >
                                    <Path d="M725.031-90q-43.992 0-74.742-30.854-30.75-30.854-30.75-74.93 0-7.244 1.5-17.027 1.5-9.783 4.885-17.497L314.461-412.462q-14.23 17.384-35.337 27.692-21.106 10.308-43.585 10.308-43.975 0-74.756-30.795-30.782-30.795-30.782-74.788 0-43.993 30.782-74.743 30.781-30.75 74.756-30.75 22.751 0 43.106 9.192 20.355 9.193 35.816 26.577l311.463-180.538q-3.385-7.457-4.885-16.558-1.5-9.102-1.5-17.596 0-43.974 30.795-74.756 30.795-30.782 74.788-30.782 43.993 0 74.743 30.768 30.75 30.769 30.75 74.724 0 44.468-30.782 75.026-30.782 30.557-74.756 30.557-22.833 0-43.263-8.077-20.429-8.077-35.045-25.461L335.692-516q2.384 8 3.884 18.228 1.5 10.228 1.5 17.934 0 7.705-1.5 16.041t-3.884 16.336l311.077 178.923q14.616-14.769 34.039-23.654 19.423-8.884 44.269-8.884 43.974 0 74.756 30.512 30.782 30.512 30.782 74.788 0 44.276-30.795 75.025-30.796 30.75-74.789 30.75Z" fill="#5f6367" />
                                </Svg>
                                <Text>Invitar amigos</Text>
                            </View>
                        </TouchableOpacity>
                    ),
                    headerTitle: ''
                }}
                component={DummyComponent}
            />
            <Drawer.Screen
                name="Ayuda"
                options={{
                    drawerLabel: () => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Svg
                                width={28}
                                height={28}
                                marginRight={5}
                                viewBox="0 -960 960 960"
                            >
                                <Path d="M455.386-140.001v-45.384h306.92q5.001 0 8.655-3.077 3.654-3.077 3.654-8.078v-294.384q0-119.609-86.319-201.458-86.319-81.848-208.255-81.848-121.936 0-208.296 81.848-86.36 81.849-86.36 201.458v235.538h-15.384q-28.769 0-49.384-20.038-20.616-20.038-20.616-48.807v-77.692q0-19.462 11.077-35.654 11.077-16.192 28.923-26.038l1.847-51.077q4.538-65.307 33.538-120.999 28.999-55.693 74.384-96.962 45.384-41.269 104.769-64.307Q413.923-819.999 480-819.999t125.154 23.039q59.076 23.038 104.768 64 45.693 40.961 74.192 96.653 28.5 55.692 34.038 121l1.847 50.077q17.461 8.23 28.73 23.538 11.27 15.307 11.27 34.153v89.308q0 18.846-11.27 34.153-11.269 15.308-28.73 23.539v63.999q0 23.51-17.048 40.024-17.049 16.515-40.645 16.515h-306.92Zm-87.875-276.538q-11.664 0-19.78-7.913-8.115-7.913-8.115-19.577 0-11.664 8.298-19.587 8.297-7.923 19.961-7.923 11.664 0 19.779 8.106 8.116 8.105 8.116 19.769 0 11.664-8.298 19.394-8.297 7.731-19.961 7.731Zm224.614 0q-11.664 0-19.779-7.913-8.116-7.913-8.116-19.577 0-11.664 8.298-19.587 8.297-7.923 19.961-7.923 11.664 0 19.78 8.106 8.115 8.105 8.115 19.769 0 11.664-8.298 19.394-8.297 7.731-19.961 7.731Zm-337.278-55.462q-6.231-97.922 60.923-167.576 67.154-69.653 166.389-69.653 81.456 0 142.571 52.307 61.115 52.308 74.731 132.538-83.615-1-153.654-45.577-70.038-44.576-108.287-119.191-15.058 74.615-63.673 131.922-48.616 57.307-119 85.23Z" fill="#5f6367" />
                            </Svg>
                            <Text>Ayuda</Text>
                        </View>
                    ),
                    headerTitle: ''
                }}
                component={SupportStackNavigator}
                listeners={({ navigation }) => ({
                    focus: () => navigation.navigate('Support')
                })}
            />
        </Drawer.Navigator>
    );
};

export default DrawerUserNavigator;
