import React from 'react'
import { View, Text } from 'react-native';

const AppointmentsAvailable = ({ route }) => {
    const { fecha } = route.params;
    return (
        <View>
          <Text>Fecha Seleccionada: {fecha}</Text>
        </View>
      );
}

export default AppointmentsAvailable