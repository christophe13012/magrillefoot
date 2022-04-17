import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';
import {colors} from '../utils/colors';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {firebase} from '@react-native-firebase/auth';
import {firebase as firebaseApp} from '@react-native-firebase/database';
import {connect, useDispatch} from 'react-redux';
import {save_items} from '../Store/actions';
import Friends from './Friends';
import TeamsComponent from './TeamsComponent';

const database = firebaseApp
  .app()
  .database(
    'https://magrillefoot-default-rtdb.europe-west1.firebasedatabase.app/',
  );

const mapDispatchToProps = dispatch => {
  return {
    save_items: items => dispatch(save_items(items)),
  };
};

const Teams = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(1);
  const [friends, setFriends] = useState([]);
  const items = useSelector(state => state.items);
  const uid = firebase.auth().currentUser.uid;
  useEffect(() => {
    const onValueChange = database
      .ref(`/friends/${uid}`)
      .on('value', snapshot => {
        if (snapshot.val()) {
          const friendsArr = Object.values(snapshot.val());
          friendsArr.sort((a, b) => b.last - a.last);
          setFriends(friendsArr);
        } else {
          setFriends([]);
        }
      });
    // Stop listening for updates when no longer required
    return () => database.ref(`/users/${uid}`).off('value', onValueChange);
  }, [uid]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: colors.background,
          flex: 1,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            marginTop: 20,
            paddingHorizontal: 15,
          }}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 22,
              marginBottom: 7,
              color: colors.white,
            }}>
            Deviens le boss 😎
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <Button
            style={{
              marginTop: 10,
              backgroundColor: mode == 1 ? colors.light : 'white',
            }}
            labelStyle={{color: colors.background}}
            onPress={() => setMode(1)}
            uppercase={false}
            mode="contained">
            Mes amis
          </Button>
          <Button
            style={{
              marginTop: 10,
              backgroundColor: mode == 0 ? colors.light : 'white',
            }}
            labelStyle={{color: colors.background}}
            onPress={() => setMode(0)}
            mode="contained"
            uppercase={false}>
            Mes teams
          </Button>
        </View>
        {mode == 1 ? (
          <Friends friends={friends} />
        ) : (
          <TeamsComponent teams={items.teams} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default connect(null, mapDispatchToProps)(Teams);
