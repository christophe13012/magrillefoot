import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {colors} from '../utils/colors';
import {
  Button,
  Avatar,
  Dialog,
  Portal,
  IconButton,
  Badge,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {firebase} from '@react-native-firebase/auth';
import {firebase as firebaseApp} from '@react-native-firebase/database';
import {connect} from 'react-redux';
import {save_items} from '../Store/actions';
import Friends from './Friends';
import TeamsComponent from './TeamsComponent';
import EmojiPicker from 'react-native-emoji-picker-staltz';
import CreateAccount from './Game/Profil/CreateAccount';
import {updateAvatar} from '../Services/http';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {levels} from '../utils/utils';

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
  const [visible, setVisible] = useState(false);
  const [avatarEmoji, setAvatarEmoji] = useState('😀');
  const [signInVisible, setSignInVisible] = useState(false);
  const [mode, setMode] = useState(1);
  const [friends, setFriends] = useState([]);
  const items = useSelector(state => state.items);
  const uid = firebase.auth().currentUser.uid;
  const [notif, setNotif] = useState(false);
  const reloadItems = newItems => {
    dispatch(save_items(newItems));
  };
  const hideDialog = async () => {
    setVisible(false);
    await updateAvatar(avatarEmoji);
  };
  const hideSignIn = async () => {
    setSignInVisible(false);
  };

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  useEffect(() => {
    //logout();
    // Check notif
    checkNotif();
  }, []);

  const checkNotif = async () => {
    const hasPermission = await messaging().hasPermission();
    console.log(hasPermission);
    if (hasPermission == -1) {
      setNotif(true);
    } else {
      setNotif(false);
    }
  };

  useEffect(() => {
    setAvatarEmoji(items.avatar);
  }, [items.avatar]);
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
  renderLevel = () => {
    const {xp: points} = {...items};
    let niveau = 1;
    for (let index = 0; index < levels.length; index++) {
      if (points >= levels[index].points) {
        niveau = index + 1;
      }
    }
    const range = levels[niveau].points - levels[niveau].points;
    const points_en_cours = points - levels[niveau].points;
    const percent = (points_en_cours / range) * 100;
    return (
      <View
        style={{
          backgroundColor: colors.background,
          marginHorizontal: 5,
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
            Mon level 😎
          </Text>
        </View>
        <View
          style={{
            marginTop: 5,
            borderRadius: 5,
            paddingBottom: 10,
            paddingTop: 10,
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', paddingHorizontal: 5}}>
            <View
              style={{
                backgroundColor: colors.light,
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                marginRight: 5,
              }}>
              <Badge
                style={{
                  backgroundColor: colors.background,
                  marginRight: 2,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                  }}>
                  {niveau}
                </Text>
              </Badge>
              <Text
                style={{
                  color: colors.background,
                  marginLeft: 2,
                  fontWeight: 'bold',
                }}>
                {levels[niveau].name}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: colors.light,
                flex: 1,
                height: 40,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <View style={{position: 'absolute', bottom: 11, zIndex: 500}}>
                <Text style={{fontWeight: 'bold', color: colors.background}}>
                  XP {points} / {levels[niveau].points}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  height: '90%',
                  width: '99%',
                }}>
                <View
                  style={{
                    backgroundColor: colors.light,
                    height: '100%',
                    width: percent + '%',
                  }}
                />
              </View>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: 12,
                marginTop: 5,
              }}>
              +25 xp si tu joues, -25 xp si tu zappes la grille 😅
            </Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            backgroundColor: colors.background,
            flex: 1,
          }}>
          <View style={{paddingHorizontal: 20, flexDirection: 'row'}}>
            <View>
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Avatar.Text
                  size={75}
                  label={avatarEmoji}
                  style={{
                    alignSelf: 'flex-start',
                    borderWidth: 2,
                    borderColor: colors.light,
                    backgroundColor: '#3949AB',
                  }}
                />
              </TouchableOpacity>
              <IconButton
                icon="circle-edit-outline"
                color={colors.light}
                size={15}
                onPress={() => setVisible(true)}
                style={{alignSelf: 'center', marginTop: 0}}
              />
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  color: colors.white,
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginLeft: 20,
                }}>
                {items.name}
              </Text>
              <IconButton
                icon="circle-edit-outline"
                color={colors.background}
                size={15}
                style={{alignSelf: 'center', marginTop: 0}}
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            {firebase.auth().currentUser &&
            !firebase.auth().currentUser.isAnonymous ? (
              <Button
                style={{
                  marginTop: 10,
                  backgroundColor: colors.background,
                  marginHorizontal: 20,
                }}
                icon="logout"
                mode="contained"
                onPress={logout}>
                Se déconnecter
              </Button>
            ) : (
              <View
                style={{
                  paddingBottom: 10,
                  marginHorizontal: 5,
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'white', fontSize: 12, marginRight: 3}}>
                    Envie
                  </Text>
                  <Text style={{color: 'white', fontSize: 12, marginRight: 3}}>
                    de
                  </Text>
                  <Text style={{color: 'white', fontSize: 12, marginRight: 3}}>
                    gagner
                  </Text>
                  <Text style={{color: 'white', fontSize: 12, marginRight: 3}}>
                    facilement
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      marginRight: 3,
                      fontWeight: 'bold',
                    }}>
                    300 💎
                  </Text>
                  <Text style={{color: 'white', fontSize: 12}}>?</Text>
                </View>
                <Button
                  compact={true}
                  style={{
                    flex: 1,
                    backgroundColor: colors.light,
                    marginHorizontal: 20,
                    height: 30,
                  }}
                  labelStyle={{color: colors.background, fontSize: 10}}
                  icon="account-star"
                  mode="contained"
                  onPress={() => setSignInVisible(true)}>
                  Je créé mon compte
                </Button>
              </View>
            )}
          </View>
          {notif && (
            <Button
              style={{
                backgroundColor: colors.background,
                marginHorizontal: 20,
                marginBottom: 10,
              }}
              icon="bell"
              mode="contained"
              onPress={requestUserPermission}>
              Activer les notifications
            </Button>
          )}
          {renderLevel()}
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
            <Friends friends={friends} name={items.name} />
          ) : (
            <TeamsComponent teams={items.teams} />
          )}
        </View>
      </ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{}}>
          <EmojiPicker
            containerStyle={{borderRadius: 5, paddingVertical: 10}}
            clearButtonStyle={{display: 'none'}}
            onEmojiSelected={emo => setAvatarEmoji(emo)}
            rows={7}
            localizedCategories={[
              // Always in this order:
              'Smileys and emotion',
              'People and body',
              'Animals and nature',
              'Food and drink',
              'Activities',
              'Travel and places',
              'Objects',
              'Symbols',
            ]}
          />
        </Dialog>
        <Dialog
          visible={signInVisible}
          onDismiss={hideSignIn}
          style={{justifyContent: 'center'}}>
          <CreateAccount
            items={items}
            reloadItems={reloadItems}
            hideModal={setSignInVisible}
          />
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default connect(null, mapDispatchToProps)(Teams);
