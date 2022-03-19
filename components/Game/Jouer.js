import React, {Component, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../utils/colors';
import {Button} from 'react-native-paper';
import {initalizeItems, isNameTaken, saveName} from '../../Services/http';
import Toast from 'react-native-tiny-toast';
import auth from '@react-native-firebase/auth';
import {connect, useDispatch} from 'react-redux';
import {save_items} from '../../Store/actions';
import {useNavigation} from '@react-navigation/native';

const Jouer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [matches, setMatches] = useState([
    {home: 'Lille', away: 'Lens'},
    {home: 'PSG', away: 'Marseille'},
    {home: 'Lyon', away: 'Monaco'},
    {home: 'Lille', away: 'Lens'},
    {home: 'PSG', away: 'Marseille'},
    {home: 'Lyon', away: 'Monaco'},
    {home: 'Lille', away: 'Lens'},
    {home: 'PSG', away: 'Marseille'},
    {home: 'Lyon', away: 'Monaco'},
    {home: 'Lille', away: 'Lens'},
    {home: 'PSG', away: 'Marseille'},
    {home: 'Lyon', away: 'Monaco'},
    {home: 'Lille', away: 'Lens'},
    {home: 'PSG', away: 'Marseille'},
  ]);
  const [choix, setChoix] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  const select = (i, c) => {
    const game = [...choix];
    if (game[i].includes(c)) {
      game[i] = game[i].filter(x => x != c);
    } else {
      game[i].push(c);
    }
    setChoix(game);
  };

  console.log('choix', choix);
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={{
            width: 30,
            height: 30,
            marginLeft: 20,
          }}
          source={require('../../images/arrow-down.png')}
        />
      </TouchableOpacity>
      <View style={{flex: 2}}>
        {matches.map((m, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              paddingHorizontal: '3%',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => select(i, 1)}
              style={{
                backgroundColor: choix[i].includes(1)
                  ? colors.light
                  : colors.backLight,
                borderRadius: 5,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: colors.black, paddingVertical: 5}}>
                {m.home}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => select(i, 0)}
              style={{
                borderRadius: 5,
                backgroundColor: choix[i].includes(0)
                  ? colors.light
                  : colors.backLight,
                marginHorizontal: '2%',
              }}>
              <Text
                style={{
                  color: colors.black,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                }}>
                Nul
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => select(i, 2)}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                backgroundColor: choix[i].includes(2)
                  ? colors.light
                  : colors.backLight,
                flex: 1,
              }}>
              <Text style={{color: colors.black, paddingVertical: 5}}>
                {m.away}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '50%',
  },
});

export default Jouer;
