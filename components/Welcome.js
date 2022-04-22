import React, {Component, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import {colors} from '../utils/colors';
import {Button, Dialog, ActivityIndicator} from 'react-native-paper';
import {initalizeItems, isNameTaken, saveName} from '../Services/http';
import Toast from 'react-native-tiny-toast';
import auth from '@react-native-firebase/auth';
import {connect, useDispatch} from 'react-redux';
import {save_items} from '../Store/actions';
import CreateAccount from './Game/Profil/CreateAccount';

const mapDispatchToProps = dispatch => {
  return {
    save_items: items => dispatch(save_items(items)),
  };
};

const Welcome = () => {
  const dispatch = useDispatch();
  const [signInVisible, setSignInVisible] = useState(false);
  const hideSignIn = async () => {
    setSignInVisible(false);
  };
  const [name, onChangeName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveName = async () => {
    setLoading(true);
    const regex = /^([a-zA-Z0-9-_]{3,20})$/;
    if (!name.match(regex)) {
      setLoading(false);
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
      setLoading(false);
    } else {
      setLoading(false);
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
        backgroundColor: colors.background,
        flex: 1,
      }}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{
            width: 225,
            height: 225,
          }}
          source={require('../images/logo.png')}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontWeight: '500', fontSize: 24, color: 'white'}}>
          Bienvenue
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 18,
            color: 'white',
            marginBottom: 15,
            marginTop: 15,
          }}>
          Tu as déjà un compte ?
        </Text>
        <Button
          mode="contained"
          color={colors.light}
          onPress={() => setSignInVisible(true)}>
          Je me connecte
        </Button>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 18,
            color: 'white',
            marginTop: 25,
          }}>
          Sinon choisis un nom et c'est parti !
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder="Nom d'utilisateur"
        />
        {loading ? (
          <ActivityIndicator color={colors.white} style={{marginTop: 10}} />
        ) : (
          <Button
            mode="contained"
            color={colors.light}
            onPress={handleSaveName}>
            Valider
          </Button>
        )}
      </View>
      <Dialog
        visible={signInVisible}
        onDismiss={hideSignIn}
        style={{justifyContent: 'center'}}>
        <CreateAccount
          items={false}
          reloadItems={false}
          onlySign={true}
          hideModal={setSignInVisible}
        />
      </Dialog>
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
