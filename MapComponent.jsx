import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity, ActivityIndicator, Animated, FlatList } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import CurrentLocationButton from './components/partials/CurrentLocationButton';
import SearchRegionButton from './components/partials/SearchRegionButton';
import direcciones from './direccciones.json'
import { getDistance } from './components/utilities/locationUtils';
import styles from './components/styles/MapComponentStyles';

const MapComponent = ({ navigation }) => {
    const [expandedHeight] = useState(new Animated.Value(70)); // Altura inicial del contenedor.

    const [mapRegion, setMapRegion] = useState(null);
    const [initialRegion, setInitialRegion] = useState({
        latitude: -34.605896, // Centro de Buenos Aires
        longitude: -58.381590
    });

    const [currentLocation, setCurrentLocation] = useState({
        latitude: 37.78825, // Valores por defecto
        longitude: -122.4324
    });

    const [filteredPoints, setFilteredPoints] = useState([]);
    const [loading, setLoading] = useState(true);  // Estado para el efecto de carga
    const [showSearchButton, setShowSearchButton] = useState(false);

    // Función para expandir el contenedor.
    const expandContainer = () => {
        Animated.timing(expandedHeight, {
            toValue: 200, // Altura final del contenedor (3/4 de la pantalla sería más alto).
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    // Función para colapsar el contenedor.
    const collapseContainer = () => {
        Animated.timing(expandedHeight, {
            toValue: 50, // Altura inicial del contenedor.
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const RADIUS = 3000;  // Radio en metros

    useEffect(() => {
        (async () => {
            // Solicitar permisos
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permiso denegado", "Usando ubicación por defecto: Centro de Buenos Aires");
                setCurrentLocation({
                    latitude: -34.605896, // Centro de Buenos Aires
                    longitude: -58.381590
                });
                setLoading(false);  // Establecer loading en false si hay un error
                return;
            }

            // Obtener la ubicación actual
            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            setCurrentLocation({ latitude, longitude });
            const filtered = direcciones?.filter(dir => {
                const distance = getDistance(latitude, longitude, dir.latitud, dir.longitud);
                return distance <= RADIUS;
            });

            setFilteredPoints(filtered);
            setLoading(false);
        })();
    }, []);

    const handleCalloutPress = (direccion) => {
        navigation.navigate('PointDetail', { data: direccion });
    };

    // Referencia al componente MapView
    const mapRef = useRef();

    // Función para mover el mapa a la ubicación actual
    const goToCurrentLocation = () => {
        if (currentLocation) {
            mapRef.current.animateToRegion({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    };

    const handleRegionChange = (region) => {
        // Si es la primera vez que se carga, se establece la región inicial.
        if (!initialRegion) {
            setInitialRegion(region);
        }

        const { latitude, longitude, latitudeDelta, longitudeDelta } = region;

        const northLat = latitude + (latitudeDelta / 2);
        const southLat = latitude - (latitudeDelta / 2);
        const westLon = longitude - (longitudeDelta / 2);
        const eastLon = longitude + (longitudeDelta / 2);

        // Comprobamos si la región actual está fuera de la región inicial.
        if (northLat > initialRegion?.latitude + (initialRegion.latitudeDelta / 2) ||
            southLat < initialRegion?.latitude - (initialRegion.latitudeDelta / 2) ||
            westLon < initialRegion?.longitude - (initialRegion.longitudeDelta / 2) ||
            eastLon > initialRegion?.longitude + (initialRegion.longitudeDelta / 2)) {
            setShowSearchButton(true);
        } else {
            setShowSearchButton(false);
        }

        setMapRegion(region);
    };


    const searchInThisRegion = () => {
        if (mapRegion) {
            const { latitude, longitude, latitudeDelta, longitudeDelta } = mapRegion;

            // Definimos los límites de la región visible en el mapa
            const northLat = latitude + (latitudeDelta / 2);
            const southLat = latitude - (latitudeDelta / 2);
            const westLon = longitude - (longitudeDelta / 2);
            const eastLon = longitude + (longitudeDelta / 2);

            // Filtramos las direcciones que están dentro de estos límites
            const filtered = direcciones.filter(dir => {
                return dir.latitud <= northLat && dir.latitud >= southLat && dir.longitud >= westLon && dir.longitud <= eastLon;
            });

            setFilteredPoints(filtered);
            setShowSearchButton(false);
        }
    };


    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        onRegionChangeComplete={handleRegionChange}
                        region={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >

                        {filteredPoints.map((direccion, index) => (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: direccion.latitud,
                                    longitude: direccion.longitud
                                }}
                                title={direccion.nombre}
                            >
                                <Callout onPress={() => handleCalloutPress(direccion)}>
                                    <TouchableOpacity>
                                        <Text>{direccion.nombre} - Toque para más detalles</Text>
                                    </TouchableOpacity>
                                </Callout>
                            </Marker>
                        ))}
                    </MapView>
                    <CurrentLocationButton onPress={goToCurrentLocation} />

                    {showSearchButton && (
                        <SearchRegionButton onPress={searchInThisRegion} />
                    )}
                    <Animated.View style={[styles.bottomContainer, { height: expandedHeight }]}>
                        <TouchableOpacity onPress={expandContainer}>
                            <Text>Expandir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={collapseContainer}>
                            <Text>Colapsar</Text>
                        </TouchableOpacity>
                        <View>
                            <FlatList
                            data={filteredPoints}
                            renderItem={({ item }) => (
                                <View>
                                    <Text>{item.nombre}</Text>
                                    </View>
                            )}/>
                                    
                        </View>
                    </Animated.View>
                </>
            )}

        </View>
    );
};

export default MapComponent;
