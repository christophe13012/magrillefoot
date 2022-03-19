import React, {Component, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {colors} from '../utils/colors';
import {Button} from 'react-native-paper';
import {initalizeItems, isNameTaken, saveName} from '../Services/http';
import Toast from 'react-native-tiny-toast';
import auth from '@react-native-firebase/auth';
import {connect, useDispatch} from 'react-redux';
import {save_items} from '../Store/actions';

const mapDispatchToProps = dispatch => {
  return {
    save_items: items => dispatch(save_items(items)),
  };
};

const Welcome = () => {
  const dispatch = useDispatch();
  const [name, onChangeName] = useState('');

  const handleSaveName = async () => {
    const regex = /^([a-zA-Z0-9-_]{3,20})$/;
    if (!name.match(regex)) {
      Toast.show(
        'Votre nom doit faire entre 3 et 20 caractères sans espaces et ne comporter que des nombres, chiffres et _ ou -',
        {
          position: 70,
          containerStyle: {backgroundColor: 'white', width: '90%'},
          textStyle: {color: 'black'},
          duration: 5000,
        },
      );
      return;
    }

    const isTaken = await isNameTaken(name);
    if (!isTaken) {
      await saveName(name);
      let infos = await auth().signInAnonymously();
      const items = await initalizeItems(infos.user.uid, name);
      dispatch(save_items(items));
    } else {
      Toast.show(
        "Hey, ce nom est déja utilisé, merci d'en choisir un autre 😉",
        {
          position: 70,
          containerStyle: {backgroundColor: 'white', width: '90%'},
          textStyle: {color: 'black'},
        },
      );
    }
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.backBack,
        flex: 1,
      }}>
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontWeight: '500', fontSize: 22, color: 'white'}}>
          Bienvenue sur magrillefoot
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontWeight: '500', fontSize: 22, color: 'white'}}>
          Choisis ton nom et c'est parti !
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="Nom d'utilisateur"
        />
        <Button
          icon="soccer"
          mode="contained"
          color={colors.backLight}
          onPress={handleSaveName}>
          Valider
        </Button>
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

export default connect(null, mapDispatchToProps)(Welcome);
