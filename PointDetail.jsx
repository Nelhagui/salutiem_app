import React, { useState } from 'react';
import OnlyCalendar from './components/calendar/OnlyCalendar';
import { View, StyleSheet } from 'react-native';
import ScheduleList from './components/calendar/ScheduleList';
import { useNavigation } from '@react-navigation/native';

const PointDetail = ({ route }) => {
    const { data } = route.params;
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log('fecha selec',date)
    };
    const handleTimeChange = (time) => {
        setSelectedTime(time);
        navigation.navigate('ConfirmDateTimeScreen', { date: selectedDate, time: time });
    };
    
    return (
        <>
            <View style={styles.container}>
                <ScheduleList onTimeSelected={handleTimeChange}/>
            </View>
            <OnlyCalendar onDateSelected={handleDateChange} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PointDetail;