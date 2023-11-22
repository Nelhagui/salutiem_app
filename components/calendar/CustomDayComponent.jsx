import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const CustomDayComponent = ({date, state, marking}) => {
  let textStyle = {};
  if (state === 'disabled' || !marking.selected) {
    textStyle = { color: 'gray', textDecorationLine: 'line-through' };
  } else if (state === 'today') {
    textStyle = { color: 'blue' };
  }

  return (
    <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={textStyle}>{date.day}</Text>
    </TouchableOpacity>
  );
};

export default CustomDayComponent;
