import React, { useRef, useEffect, useState } from 'react';
import { View, Alert, Text, TouchableOpacity, ActivityIndicator, Dimensions, Animated, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import CurrentLocationButton from './components/partials/CurrentLocationButton';
import SearchRegionButton from './components/partials/SearchRegionButton';
import direcciones from './direccciones.json'
import { getDistance } from './components/utilities/locationUtils';
import styles from './components/styles/MapComponentStyles';
import { getMedicos } from './src/services/services';

const MapComponent = ({ navigation }) => {
    const [expandedHeight] = useState(new Animated.Value(100)); // Altura inicial del contenedor.
    const screenHeight = Dimensions.get('window').height;
    const threeQuartersHeight = screenHeight * 0.65;

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
    const [searchText, setSearchText] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [isSearching, setIsSearching] = useState(false)

    // Función para expandir el contenedor.
    const expandContainer = () => {
        Animated.timing(expandedHeight, {
            toValue: threeQuartersHeight, // Altura final del contenedor (3/4 de la pantalla sería más alto).
            duration: 400,
            useNativeDriver: false,
        }).start();
    };

    // Función para colapsar el contenedor.
    const collapseContainer = () => {
        Animated.timing(expandedHeight, {
            toValue: 100, // Altura inicial del contenedor.
            duration: 400,
            useNativeDriver: false,
        }).start();
    };

    const RADIUS = 2000;  // Radio en metros

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
            // const filtered = direcciones?.filter(dir => {
            //     const distance = getDistance(latitude, longitude, dir.latitud, dir.longitud);
            //     return distance <= RADIUS;
            // });

            // setFilteredPoints(filtered);
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
            console.log('trueee')
        } else {
            setShowSearchButton(false);
            console.log('falseee')
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

    const filterData = (text) => {
        setSearchText(text);
        // Limpia el timeout anterior si hay uno
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // Establece un nuevo timeout
        const newTimeoutId = setTimeout(() => {
            // Aquí realizas la consulta fetch
            setIsSearching(true)
            fetch(`tu_endpoint_de_busqueda?query=${text}`)
                .then(response => response.json())
                .then(data => {
                    // Suponiendo que data es el array de resultados
                    setFilteredPoints(data);
                })
                .catch(error => {
                    console.error('Error al realizar la búsqueda:', error);
                });
            setIsSearching(false)
        }, 600); // Tiempo de espera en milisegundos

        setTimeoutId(newTimeoutId);
    };

    const toggleContainer = () => {
        setIsExpanded(!isExpanded);
        if (isExpanded) {
            collapseContainer(); // Lógica para colapsar el contenedor
        } else {
            expandContainer(); // Lógica para expandir el contenedor
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getMedicos();
            } catch (error) {
                console.error('Error en fetchData:', error);
            }
        };

        fetchData();
    }, []);

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
                        <TouchableOpacity
                            onPress={toggleContainer}
                        >
                            <Text
                                style={styles.openCloseButton}
                            >
                                {isExpanded ? 'Ocultar lista' : 'Mostrar lista'}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.contentSearchInput}>
                            <TextInput
                                style={styles.searchInput}
                                value={searchText}
                                onChangeText={filterData}
                                placeholder="Busca por especialidad..."
                                editable={!isSearching}
                            />
                        </View>
                        <View>
                            <FlatList
                                data={filteredPoints}
                                contentContainerStyle={{ paddingBottom: 100 }}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleCalloutPress(item)}>
                                        <View style={styles.contentList}>
                                            <View style={styles.itemList}>
                                                <Text style={styles.textListDireccion}>{item.direccion}</Text>
                                                <Text style={styles.textListNombreEspecialidad}>{item.nombre}, {item.especialidad}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )} />
                        </View>
                    </Animated.View>
                </>
            )}

        </View>
    );
};



export default MapComponent;
