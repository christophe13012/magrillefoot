import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {colors} from '../../utils/colors';
import Details from './Details';
import GrilleGame from './GrilleGame';
import Histo from './Histo';
import JouerButton from './JouerButton';

const Game = () => {
  return (
    <View
      style={{
        marginTop: 15,
        paddingHorizontal: 10,
      }}>
      <Text style={{fontWeight: '500', fontSize: 22, marginLeft: 10}}>
        À toi de jouer
      </Text>
      <View
        style={{
          marginTop: 15,
          backgroundColor: colors.backBack,
          borderRadius: 10,
          paddingLeft: 10,
          paddingBottom: 10,
        }}>
        <Details />
        <JouerButton />
        <Histo />
      </View>
    </View>
  );
};

export default Game;
