import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Chip } from 'react-native-paper';

const EditSpecialties = ({ route }) => {
    const { especialidadesPreseleccionadas } = route.params;
    const [searchQuery, setSearchQuery] = useState('');
    const [especialidades, setEspecialidades] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = require('./especialidades.json');
                setEspecialidades(data);
            } catch (error) {
                console.error("Error cargando las especialidades:", error);
            }
        };

        loadData();
    }, []);

    const handleSearch = () => {
        const results = especialidades.filter(especialidad =>
            especialidad.nombre.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredResults(results);
    };

    const handleRemoveChip = (chipIndex) => {
        // Lógica para manejar la eliminación del chip
        console.log('Eliminar chip en la posición:', chipIndex);
        // Aquí debes actualizar tu estado o lógica para eliminar el chip
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 120}
        >
            <View style={styles.chipContainer}>
                <Text style={{ marginBottom: 5, marginLeft: 16 }}>Especialidades Seleccionadas:</Text>
                <ScrollView
                    style={styles.chipScrollView}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {especialidadesPreseleccionadas.map((especialidad, index) => (
                        <Chip
                            key={index}
                            mode="outlined"
                            style={styles.chip}
                        >
                            {especialidad.nombre}
                            <TouchableOpacity onPress={() => handleRemoveChip(index)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </Chip>
                    ))}
                </ScrollView>
            </View>

            <ScrollView style={styles.scrollView}>
                {filteredResults.map((especialidad, index) => (
                    <Text key={index} style={styles.listItem}>
                        {especialidad.nombre}
                    </Text>
                ))}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Buscar especialidad"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    style={styles.input}
                    onSubmitEditing={handleSearch}
                    returnKeyType="search"
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chipContainer: {
        flex: 0, // Esto evita que el contenedor expanda el ScrollView más de lo necesario
        marginBottom: 10,
        paddingTop: 16,
        paddingBottom: 8,
        backgroundColor: 'white'
    },
    chipScrollView: {
        height: 'auto', // Ajusta esta altura según el tamaño de tus chips
    },
    chip: {
        marginVertical: 5,
        marginHorizontal: 5,
    },
    closeButton: {
        // backgroundColor: 'red',
        maxWidth: 26,
        marginLeft: 16,
        // Estilos adicionales para el botón de cierre si es necesario
    },
    closeButtonText: {
        color: 'black',
        // textAlign: 'center',
        // textAlignVertical: 'bottom',
        textAlign: 'right',
        // backgroundColor:'green',
        // Otros estilos para el texto "X" si es necesario
    },
    scrollView: {
        flex: 1,
    },
    inputContainer: {
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default EditSpecialties;
