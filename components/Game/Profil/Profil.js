import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {colors} from '../../utils/colors';
import auth from '@react-native-firebase/auth';
import {Button} from 'react-native-paper';

const Profil = () => {
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <Text>Profil</Text>
      <Button
        style={{marginTop: 50}}
        icon="logout"
        mode="contained"
        onPress={logout}>
        Se déconnecter
      </Button>
    </View>
  );
};

export default Profil;
