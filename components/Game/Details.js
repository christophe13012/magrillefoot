import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {colors} from '../../utils/colors';

const Details = () => {
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          borderRadius: 50,
          backgroundColor: colors.back,
          height: 30,
          width: 30,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
        }}>
        <Text>#</Text>
      </View>
      <View>
        <Text style={{color: colors.black}}>Grille en cours</Text>
        <Text style={{color: colors.black}}>à valider avant le 15 juillet</Text>
      </View>
    </View>
  );
};

export default Details;
