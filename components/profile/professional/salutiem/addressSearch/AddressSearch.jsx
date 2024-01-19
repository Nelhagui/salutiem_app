import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useProfessionalDirectionsContext } from '../../../../../src/context/ProfessionalDirectionsContext';
import { getSimilarAddresses } from '../../../../../src/services/servicesRolMedico';
import { getCoordinatesAddresses } from '../../../../../src/services/servicesRolMedico';


const AddressSearch = ({ route, navigation }) => {
    const inputRef = useRef(null);
    const { typeAddress } = route.params;
    const {
        setSecondaryAddress,
        setMainAddress,
        setSecondaryCoordinates,
        setMainCoordinates
    } = useProfessionalDirectionsContext();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCoordinates, setSelectedCoordinates] = useState(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const fetchSimilarAddress = async (inputSearch) => {
        try {
            const response = await getSimilarAddresses(inputSearch);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Error fetching suggestions: ${response.statusText}`);
            }
            setSuggestions(data.predictions);
        } catch (error) {
            console.error('Error fetching suggestions:', error.message);
        }
    };

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            fetchSimilarAddress(query);
        }, 500); // Ajusta el tiempo de espera según tus necesidades

        return () => clearTimeout(debounceTimeout); // Limpia el timeout en cada cambio de entrada
    }, [query]);

    const fetchGetCoordinates = async (place_id) => {
        try {
            const response = await getCoordinatesAddresses(place_id);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Error fetching suggestions: ${response.statusText}`);
            }
            console.log('opaaa', data.results[0]?.geometry.location)
            if (typeAddress === "main")
                setMainCoordinates(data.results[0]?.geometry.location);
            if (typeAddress === "secondary")
                setSecondaryCoordinates(data.results[0]?.geometry.location);
            //volver a la vista anterior
            navigation.goBack();

        } catch (error) {
            console.error('Error fetching suggestions:', error.message);
        }
    };

    const handleSelectPlaceId = (placeId, descriptionAddress) => {
        if (typeAddress == "main")
            setMainAddress(descriptionAddress)
        if (typeAddress == "secondary")
            setSecondaryAddress(descriptionAddress)
        fetchGetCoordinates(placeId)
    };

    const renderItem = ({ item }) => {
        const cadena = item.description;
        const partes = cadena.split(', ');
        var primerElemento = partes.shift();  // Extraer el primer elemento
        var restoComoString = partes.join(', ');
        return (
            <>
                <View
                    style={{
                        width: '100%',
                        marginVertical: 2,
                        paddingVertical: 8,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handleSelectPlaceId(item?.place_id, item?.description)}
                    >
                        <Text style={styles.suggestionItem}>{primerElemento}</Text>
                        <Text style={styles.suggestionSecondItem}>{restoComoString}</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentProfileText}>
                <TextInput
                    ref={inputRef}
                    style={styles.profileText}
                    onChangeText={(text) => setQuery(text)}
                    value={query}
                    placeholder={"Buscar dirección"}
                // placeholder="Buscar dirección"
                />
            </View>
            <FlatList
                style={styles.list}
                data={suggestions}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'top',
        marginTop: 10,
        paddingHorizontal: 16,
    },
    list: {
        width: '100%'
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    suggestionItem: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'left'
    },
    suggestionSecondItem: {
        fontSize: 14,
        textAlign: 'left'
    },
    contentProfileText: {
        paddingVertical: 4,
        marginBottom: 7,
        width: '100%',
    },
    profileText: {
        width: '100%',
        fontWeight: '400',
        fontSize: 16,
        color: '#383b3d',
        borderWidth: 0.4,
        padding: 10,
        borderRadius: 6,
        borderBottomColor: '#5f6367',
    },
    labelProfileText: {
        fontSize: 13,
        color: '#5f6367',
        marginBottom: 4,
    },
});

export default AddressSearch;
