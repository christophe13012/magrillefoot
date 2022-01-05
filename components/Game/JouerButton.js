import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {colors} from '../../utils/colors';

const JouerButton = () => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 10,
        backgroundColor: colors.back,
        borderRadius: 10,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
      }}>
      <Text
        style={{
          fontSize: 19,
          fontWeight: '400',
          color: colors.text,
          fontWeight: '500',
        }}>
        Jouer
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.backLight,
          position: 'absolute',
          right: 20,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>50</Text>
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
