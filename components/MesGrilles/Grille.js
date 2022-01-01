import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {colors} from '../../utils/colors';

const Grille = () => {
  return (
    <View
      style={{
        marginTop: 30,
        paddingHorizontal: 20,
      }}>
      <Text style={{fontWeight: '500', fontSize: 22}}>Mes grilles</Text>
    </View>
  );
};

export default Grille;
