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
      <Text style={{fontSize: 18, fontWeight: '400', color: colors.text}}>
        Jouer
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.white,
          position: 'absolute',
          right: 20,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10,
        }}>
        <Text>50</Text>
        <Image
          style={{
            width: 20,
            height: 20,
            marginLeft: 3,
          }}
          source={require('../../images/baby.png')}
        />
      </View>
    </TouchableOpacity>
  );
};

export default JouerButton;
