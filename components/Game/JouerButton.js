import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {colors} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';

const JouerButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Jouer')}
      style={{
        marginTop: 10,
        backgroundColor: colors.background,
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text
        style={{
          fontSize: 19,
          fontWeight: '400',
          color: colors.white,
          fontWeight: '500',
        }}>
        Jouer
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.white,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: colors.black}}>
          50
        </Text>
        <Image
          style={{
            width: 25,
            height: 25,
            marginLeft: 3,
          }}
          source={require('../../images/coin.png')}
        />
      </View>
    </TouchableOpacity>
  );
};

export default JouerButton;
