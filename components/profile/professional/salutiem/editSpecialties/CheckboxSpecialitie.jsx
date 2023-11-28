import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { TextInput, Text, Provider } from 'react-native-paper';
import Checkbox from '../../../../inputs/Checkbox';

const CheckboxSpecialitie = ({ specialitie }) => {
    const [subEspecialities, setSubEspecialities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isChecked, setIsChecked] = useState(false);

    const handlePress = useCallback((newChecked) => {
        setIsChecked(newChecked);
    }, []);

    useEffect(() => {
        if (specialitie?.subespecialidades) {
            setSubEspecialities(specialitie?.subespecialidades)
        }
    }, [specialitie]);

    return (
        <View style={styles.itemContainer}>
            <View style={styles.bodyItems}>
                <Checkbox onPress={handlePress}>
                    <View style={styles.checkboxContainer}>
                        <Text style={styles.listItem}>{specialitie.nombre}</Text>
                    </View>
                </Checkbox>
            </View>
            <View style={styles.containerSubespecialidades}>
                <FlatList
                    data={specialitie.subespecialidades}
                    keyExtractor={(subItem, subIndex) => subIndex.toString()}
                    renderItem={({ item: subItem }) => (
                        <View style={styles.bodyItems} key={Math.random()}>
                            <Checkbox>
                                <Text style={styles.subListItem}>{subItem.nombre}</Text>
                            </Checkbox>
                        </View>
                    )
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Esto asegura que el campo de texto esté en la parte inferior
    },
    searchInput: {
        marginBottom: 10,
        marginHorizontal: 10,
    },
    itemContainer: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    checkboxContainer: {
        flexDirection: 'row',
    },
    listItem: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5,
    },
    containerSubespecialidades: {
        // backgroundColor: 'red',
        marginLeft: 26,
        borderLeftColor: 'grey',
        borderLeftWidth: .5,
        paddingLeft: 10,

    },
    subListItem: {
        fontSize: 16,
        marginLeft: 20,

    },
    bodyItems: {
        backgroundColor: 'white',
        borderWidth: 0.4,
        borderColor: 'grey',
        borderRadius: 15,
        marginTop: 7,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsText: {
        fontSize: 18,
        color: 'grey',
        // Añade más estilos si es necesario
    },
});

export default CheckboxSpecialitie;
