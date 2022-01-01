import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {colors} from '../../utils/colors';

const GrilleGame = () => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 10,
        backgroundColor: colors.back,
        borderRadius: 10,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 18, fontWeight: '400', color: colors.text}}>
        Voir la grille
      </Text>
    </TouchableOpacity>
  );
};

export default GrilleGame;
