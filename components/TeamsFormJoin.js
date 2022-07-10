import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';
import {colors} from '../utils/colors';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {getUniqueId, addFriend} from '../Services/http';
import {firebase} from '@react-native-firebase/auth';
import {connect, useDispatch} from 'react-redux';
import {save_items} from '../Store/actions';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-tiny-toast';
import {Button, Dialog, Portal} from 'react-native-paper';
import {Input, Item} from 'native-base';
import {levels} from '../utils/utils';

const mapDispatchToProps = dispatch => {
  return {
    save_items: items => dispatch(save_items(items)),
  };
};
const TeamsFormJoin = ({friends}) => {
  const dispatch = useDispatch();
  const [visibleIn, setVisibleIn] = useState(false);
  const [visibleOut, setVisibleOut] = useState(false);
  const [code, setCode] = useState('');
  const hideDialog = async () => {
    setVisibleIn(false);
    setCode('');
  };
  const hideDialogOut = async () => {
    setVisibleOut(false);
  };
  const [mode, setMode] = useState(0);
  const [uniqueId, setUniqueId] = useState(0);
  const items = useSelector(state => state.items);
  useEffect(() => {
    (async () => {
      const id = await getUniqueId();
      setUniqueId(id);
    })();
  }, []);
  const copyToClipboard = text => {
    Clipboard.setString(text);
    Toast.show("C'est copié, maintenant fais tourner 😉", {
      position: 70,
      containerStyle: {
        backgroundColor: colors.warning,
        width: '90%',
      },
      textStyle: {color: 'white'},
      duration: 2000,
    });
  };
  const doAddFriend = async () => {
    const friend = await addFriend(code.trim().toLowerCase());
    if (friend === 'inconnu') {
      Toast.show("Oups, je crois que ce joueur n'existe pas 🧐", {
        position: 70,
        containerStyle: {
          backgroundColor: colors.warning,
          width: '90%',
        },
        textStyle: {color: 'white'},
        duration: 2000,
      });
    } else if (!friend) {
      Toast.show("Tu l'as déjà ajouté celui-là non ? 😉", {
        position: 70,
        containerStyle: {
          backgroundColor: colors.warning,
          width: '90%',
        },
        textStyle: {color: 'white'},
        duration: 2000,
      });
    } else {
      Toast.show('Ton ami a bien été ajouté 😉', {
        position: 70,
        containerStyle: {
          backgroundColor: colors.warning,
          width: '90%',
        },
        textStyle: {color: 'white'},
        duration: 2000,
      });
    }
  };
  console.log('length', friends.length);
  return (
    <View style={friends.length > 4 ? {flex: 1} : {height: 430}}>
      <ScrollView
        contentContainerStyle={{}}
        style={
          friends.length > 5
            ? {
                backgroundColor: 'white',
                marginTop: 50,
                marginHorizontal: 10,
                borderRadius: 10,
                marginBottom: 30,
              }
            : {
                backgroundColor: 'white',
                marginTop: 50,
                marginHorizontal: 10,
                borderRadius: 10,
                marginBottom: 30,
              }
        }>
        <View
          style={{
            justifyContent: 'center',
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text>Ajoute un ami pour recevoir 150 💎</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button
            style={{
              marginTop: 10,
              backgroundColor: colors.light,
            }}
            labelStyle={{color: colors.background}}
            mode="contained"
            uppercase={false}
            onPress={() => setVisibleOut(true)}>
            Ajouter un ami
          </Button>
          <Button
            style={{
              marginTop: 10,
              backgroundColor: colors.light,
            }}
            labelStyle={{color: colors.background}}
            mode="contained"
            uppercase={false}
            onPress={() => setVisibleIn(true)}>
            J'ai reçu un code
          </Button>
        </View>
        <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
          {friends.length > 0 ? (
            friends.map((friend, id) => (
              <View
                key={id}
                style={{
                  height: 50,
                  backgroundColor: colors.background,
                  marginBottom: 10,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: 'white',
                    height: 35,
                    width: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Text>{id + 1}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                  }}>
                  <View style={{}}>
                    <Text style={{color: 'white', fontWeight: '500'}}>
                      {friend.name}
                    </Text>
                    <Text style={{color: 'white', fontSize: 12}}>
                      Level : {levels[friend.level].name}
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text style={{color: 'white', fontSize: 12}}>
                      Dernière grille : {friend.last}
                    </Text>
                    <Text style={{color: 'white', fontSize: 12}}>
                      Moyenne : {friend.moyenne.toFixed(1)}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View>
              <Text>Tu n'as encore aucun ami connecté à l'app</Text>
            </View>
          )}
        </View>
        <Portal>
          <Dialog
            visible={visibleIn}
            onDismiss={hideDialog}
            style={{
              height: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{}}>Saisi le code que tu as reçu</Text>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Item
                regular
                style={{width: 120, backgroundColor: 'white', height: 35}}>
                <Input placeholder="Code" value={code} onChangeText={setCode} />
              </Item>
              <Button
                style={{backgroundColor: colors.light, marginLeft: 5}}
                onPress={doAddFriend}>
                <Text style={{color: colors.background}}>Valider</Text>
              </Button>
            </View>
          </Dialog>
          <Dialog
            visible={visibleOut}
            onDismiss={hideDialogOut}
            style={{
              height: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 14,
              }}>
              Fais tourner ton code à tes amis
            </Text>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 15,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Item
                regular
                style={{
                  width: 90,
                  backgroundColor: 'white',
                  height: 35,
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18, textAlign: 'center'}}>
                  {uniqueId}
                </Text>
              </Item>
              <Button
                style={{backgroundColor: colors.light, marginLeft: 5}}
                onPress={() => copyToClipboard(uniqueId)}>
                <Text style={{color: colors.background}}>Copier</Text>
              </Button>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text>Dès qu'il se connectera, tu recevras 100 💎</Text>
            </View>
          </Dialog>
        </Portal>
      </ScrollView>
    </View>
  );
};

export default connect(null, mapDispatchToProps)(TeamsFormJoin);
