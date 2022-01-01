import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {colors} from '../utils/colors';

const Items = () => {
  return (
    <View
      style={{
        height: 130,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
      }}>
      <View
        style={{
          backgroundColor: colors.back,
          borderRadius: 10,
          paddingHorizontal: 15,
          paddingVertical: 15,
          alignItems: 'center',
          justifyContent: 'center',
          width: '25%',
        }}>
        <Image
          style={{
            width: 30,
            height: 30,
          }}
          source={require('../images/baby.png')}
        />
        <Text style={{fontWeight: 'bold', marginTop: 5, color: colors.text}}>
          1500
        </Text>
        <Text style={{color: colors.grey}}>pièces</Text>
      </View>
      <View
        style={{
          backgroundColor: colors.back,
          borderRadius: 10,
          paddingHorizontal: 15,
          paddingVertical: 15,
          alignItems: 'center',
          justifyContent: 'center',
          width: '25%',
        }}>
        <Image
          style={{
            width: 30,
            height: 30,
          }}
          source={require('../images/baby.png')}
        />
        <Text style={{fontWeight: 'bold', marginTop: 5, color: colors.text}}>
          8
        </Text>
        <Text style={{color: colors.grey}}>bonus</Text>
      </View>
      <View
        style={{
          backgroundColor: colors.back,
          borderRadius: 10,
          paddingHorizontal: 15,
          paddingVertical: 15,
          alignItems: 'center',
          justifyContent: 'center',
          width: '25%',
        }}>
        <Image
          style={{
            width: 30,
            height: 30,
          }}
          source={require('../images/baby.png')}
        />
        <Text style={{fontWeight: 'bold', marginTop: 5, color: colors.text}}>
          Acheter
        </Text>
        <Text style={{color: colors.grey}}>bonus</Text>
      </View>
    </View>
  );
};

export default Items;
