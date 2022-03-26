import {firebase} from '@react-native-firebase/database';
import Axios from 'axios';

const database = firebase
  .app()
  .database(
    'https://magrillefoot-default-rtdb.europe-west1.firebasedatabase.app/',
  );

export const saveUser = async user => {
  firebase.database().ref(`/usersList/${firebase.auth().currentUser.uid}`).set({
    displayName: user.displayName,
    email: user.email,
    phoneNumber: user.phoneNumber,
  });
};

export const getTest = async () => {
  const ref = firebase
    .app()
    .database(
      'https://magrillefoot-default-rtdb.europe-west1.firebasedatabase.app/',
    )
    .ref(`/test`);
  const snapshot = await ref.once('value');
  console.log('hello 3', snapshot.val());
  return snapshot.val();
};

export const isNameTaken = async name => {
  const ref = firebase
    .app()
    .database(
      'https://magrillefoot-default-rtdb.europe-west1.firebasedatabase.app/',
    )
    .ref(`/names/${name.toLowerCase()}`);
  const snapshot = await ref.once('value');
  return snapshot.val();
};

export const saveName = async name => {
  firebase
    .app()
    .database(
      'https://magrillefoot-default-rtdb.europe-west1.firebasedatabase.app/',
    )
    .ref(`names/${name.toLowerCase()}`)
    .set({
      name,
    });
};

export const initalizeItems = async (userID, name) => {
  const ref = database.ref(`/balls`);
  const snapshot = await ref.once('value');
  const items = {
    grilles: 3,
    coins: 15,
    shield: 0,
    bingoballs: snapshot.val(),
    name,
  };
  database.ref('items/' + userID).set(items);
  return items;
};

export const updateItems = async (ballon, id) => {
  const ref = database.ref(`/items/${firebase.auth().currentUser.uid}`);
  const snapshot = await ref.once('value');
  let data = {...snapshot.val()};
  data.bingoballs[id].active = false;
  data.coins = ballon.value + data.coins;
  ref.set(data);
};

export const updateBonus = async bonus => {
  const ref = database.ref(`/items/${firebase.auth().currentUser.uid}`);
  const snapshot = await ref.once('value');
  let data = {...snapshot.val()};
  data.coins = data.coins - 50;
  data.bonus = data.bonus + bonus;
  ref.set(data);
};
