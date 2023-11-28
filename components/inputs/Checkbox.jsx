import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Checkbox = ({ onPress, children }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handlePress = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        if (onPress) {
          onPress(newChecked);
        }
      };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <View style={styles.checkbox}>
                {isChecked && <View style={styles.checked} />}
            </View>
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        height: 20,
        width: 20,
        borderWidth: 0.8,
        borderColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        marginLeft: 8,
    },
    checked: {
        height: 10,
        width: 10,
        backgroundColor: 'blue',
    },
});

export default Checkbox;
