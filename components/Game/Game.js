import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {colors} from '../../utils/colors';
import Details from './Details';
import Histo from './Histo';
import JouerButton from './JouerButton';

const Game = ({items, grilles}) => {
  return (
    <View
      style={{
        marginTop: 15,
        paddingHorizontal: 10,
      }}>
      <Text
        style={{
          fontWeight: '500',
          fontSize: 22,
          marginLeft: 10,
          color: colors.white,
        }}>
        À toi de jouer
      </Text>
      <View
        style={{
          marginTop: 15,
          backgroundColor: colors.white,
          borderRadius: 10,
          paddingBottom: 10,
        }}>
        <View
          style={{
            backgroundColor: 'yellow',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingRight: 15,
            height: 30,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            1000€ à gagner !
          </Text>
        </View>
        <View style={{paddingHorizontal: 7}}>
          <Details grilles={grilles} />
          <JouerButton items={items} limit={grilles.details.limit} />
          <Histo grilles={grilles} />
        </View>
      </View>
    </View>
  );
};

export default Game;
