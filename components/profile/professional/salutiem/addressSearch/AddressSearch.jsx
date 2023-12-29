import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';


const AddressSearch = () => {
    const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCoordinates, setSelectedCoordinates] = useState(null);

    const fetchSuggestionsMapBox = async (input) => {
        try {
            console.warn('holaaa');
            const apiKey = 'pk.eyJ1IjoibmVsc29uYWd1aWFyIiwiYSI6ImNscWR5MTd2aTBpajEybG5wNHdiMWtucHAifQ.2H93almWp2Ne3S8XosquXQ';
            const cantResult = 5;
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?country=ar&limit=${cantResult}&proximity=ip&types=address&language=es&access_token=${apiKey}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error fetching suggestions: ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data)
            setSuggestions(data.features); // Assuming suggestions are in the 'features' property
        } catch (error) {
            console.error('Error fetching suggestions:', error.message);
        }
    };

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            fetchSuggestionsMapBox(query);
        }, 300); // Ajusta el tiempo de espera según tus necesidades

        return () => clearTimeout(debounceTimeout); // Limpia el timeout en cada cambio de entrada
    }, [query]);

    const handleSelectSuggestion = (selectedCoords) => {
        // Guardar las coordenadas seleccionadas
        setSelectedCoordinates(selectedCoords);
    };

    const renderItem = ({ item }) => {
        const cadena = item.place_name_es;
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
                        onPress={() => handleSelectSuggestion({ latitude: 40.7128, longitude: -74.0060 })}
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
                    style={styles.profileText}
                    onChangeText={(text) => setQuery(text)}
                    value={query}
                    placeholder="Buscar dirección"
                />
            </View>
            <FlatList
                style={styles.list}
                data={suggestions}
                keyExtractor={(item) => item.id.toString()}
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
