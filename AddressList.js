import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const AddressList = ({ data, onItemPress }) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.listItem} onPress={() => onItemPress(item)}>
                    <Text>{item.nombre}</Text>
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
    listItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
});

export default AddressList;
