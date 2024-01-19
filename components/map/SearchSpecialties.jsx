import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, FlatList, TextInput, TouchableOpacity, Text } from 'react-native';
import { searchSpecialty } from '../../src/services/servicesSpecialties';
import { useAuth } from '../../src/context/AuthContext';
import { useMapContext } from '../../src/context/MapContext';


const SearchSpecialties = () => {
    const {accessToken} = useAuth();
    const { setSpecialtySelected } = useMapContext();
    const inputRef = useRef(null);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            fetchSimilarSpecialties(query);
        }, 500);

        return () => clearTimeout(debounceTimeout);
    }, [query]);

    const handleSelectSpecialty = (item) => {
        setSpecialtySelected(item)
    }

    const renderItem = ({ item }) => {
        return (
            <>
                <View
                    style={{
                        width: '100%',
                        marginVertical: 5,
                        paddingVertical: 8,
                        marginLeft: 5,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => handleSelectSpecialty(item)}
                    >
                        <Text style={styles.suggestionItem}>{item.nombre}</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    };
    const fetchSimilarSpecialties = async (inputSearch) => {
        try {
            const response = await searchSpecialty(inputSearch, accessToken);
            console.log('response', response);
            // const data = await response.json();
            if (!response) {
                throw new Error(`Error fetching suggestions: ${response}`);
            }
            setSuggestions(response);
        } catch (error) {
            console.error('Error fetching suggestions:', error.message);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.contentProfileText}>
                <TextInput
                    ref={inputRef}
                    style={styles.profileText}
                    onChangeText={(text) => setQuery(text)}
                    value={query}
                    placeholder={"Ingrese una especialidad"}
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
}

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

export default SearchSpecialties