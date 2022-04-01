import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {colors} from '../../../utils/colors';
import auth from '@react-native-firebase/auth';
import {
  Button,
  Avatar,
  Dialog,
  Portal,
  IconButton,
  Badge,
} from 'react-native-paper';
import EmojiPicker from 'react-native-emoji-picker-staltz';
import {useSelector} from 'react-redux';
import {updateAvatar} from '../../../Services/http';
import {firebase} from '@react-native-firebase/auth';
import CreateAccount from './CreateAccount';

const niveaux = [
  {points: 0, name: 'Amateur'},
  {points: 750, name: 'Espoir'},
  {points: 1500, name: 'Pro'},
  {points: 2500, name: 'International'},
  {points: 3500, name: 'Crack'},
  {points: 5000, name: "Ballon d'or"},
  {points: 10000, name: 'Légende'},
];

const Profil = () => {
  const [avatarEmoji, setAvatarEmoji] = useState('😀');
  const [visible, setVisible] = useState(false);
  const [signInVisible, setSignInVisible] = useState(false);
  const hideDialog = async () => {
    setVisible(false);
    await updateAvatar(avatarEmoji);
  };
  const hideSignIn = async () => {
    setSignInVisible(false);
  };
  const items = useSelector(state => state.items);
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  useEffect(() => {
    setAvatarEmoji(items.avatar ?? '😀');
  }, []);
  renderLevel = () => {
    const {xp: points} = {...items};
    let niveau = 1;
    for (let index = 0; index < niveaux.length; index++) {
      if (points >= niveaux[index].points) {
        niveau = index + 1;
      }
    }
    const range = niveaux[niveau].points - niveaux[niveau - 1].points;
    const points_en_cours = points - niveaux[niveau - 1].points;
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
                {niveaux[niveau - 1].name}
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
                  XP {points} / {niveaux[niveau].points}
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
  console.log('tesst', firebase.auth().currentUser);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          height: 100,
          backgroundColor: colors.background,
        }}></View>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Avatar.Text
          size={130}
          label={avatarEmoji}
          style={{
            alignSelf: 'center',
            marginTop: -50,
            borderWidth: 2,
            borderColor: colors.light,
            backgroundColor: '#3949AB',
          }}
        />
      </TouchableOpacity>
      <IconButton
        icon="circle-edit-outline"
        color={colors.background}
        size={20}
        onPress={() => setVisible(true)}
        style={{alignSelf: 'center'}}
      />
      <View style={{alignItems: 'center'}}>
        <Text
          style={{color: colors.background, fontWeight: 'bold', fontSize: 20}}>
          {items.name}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
          paddingVertical: 20,
        }}>
        <View
          style={{
            backgroundColor: colors.background,
            height: 80,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 5,
            borderRadius: 10,
          }}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{color: colors.light, fontWeight: 'bold', fontSize: 20}}>
              100
            </Text>
            <Text style={{color: 'white', marginTop: 10}}>grilles jouées</Text>
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{color: colors.light, fontWeight: 'bold', fontSize: 20}}>
              7
            </Text>
            <Text style={{color: 'white', marginTop: 10}}>amis</Text>
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{color: colors.light, fontWeight: 'bold', fontSize: 20}}>
              1
            </Text>
            <Text style={{color: 'white', marginTop: 10}}>teams</Text>
          </View>
        </View>
        {renderLevel()}
        <View>
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
                backgroundColor: colors.background,
                paddingVertical: 10,
                marginHorizontal: 5,
                borderRadius: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Envie de gagner facilement 300
                </Text>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    marginLeft: 3,
                    marginRight: 5,
                  }}
                  source={require('../../../images/coin.png')}
                />
                <Text style={{color: 'white', fontWeight: 'bold'}}>?</Text>
              </View>
              <Button
                style={{
                  marginTop: 10,
                  backgroundColor: colors.light,
                  marginHorizontal: 20,
                }}
                labelStyle={{color: colors.background}}
                icon="account-star"
                mode="contained"
                onPress={() => setSignInVisible(true)}>
                Je créé mon compte
              </Button>
            </View>
          )}
        </View>
      </View>
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
          <CreateAccount />
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
};

export default Profil;
