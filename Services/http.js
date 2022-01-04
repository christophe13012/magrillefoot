import {firebase} from '@react-native-firebase/database';
import Axios from 'axios';

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
