import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {colors} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-tiny-toast';

const JouerButton = ({items, limit}) => {
  const navigation = useNavigation();
  const jouer = () => {
    if (Date.now() > limit) {
      Toast.show(
        "Désolé l'heure limite est dépassée ... La nouvelle grille arrive très rapidement 🔜",
        {
          position: 70,
          containerStyle: {backgroundColor: colors.warning, width: '90%'},
          textStyle: {color: 'white'},
          duration: 4000,
        },
      );
    } else if (items.coins < 50) {
      Toast.show("Tu n'as pas assez de coins pour jouer", {
        position: 70,
        containerStyle: {
          backgroundColor: colors.warning,
          width: '90%',
        },
        textStyle: {color: 'white'},
        duration: 2000,
      });
    } else {
      navigation.navigate('Jouer');
    }
  };
  return (
    <TouchableOpacity
      onPress={jouer}
      style={{
        marginTop: 30,
        marginBottom: 20,
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
