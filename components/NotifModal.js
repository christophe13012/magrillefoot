import React, {cloneElement, Component, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {colors} from '../utils/colors';
import {Button, Dialog, Portal, Card} from 'react-native-paper';
import {requestTrackingPermission} from 'react-native-tracking-transparency';

const NotifModal = ({visible, setVisible, requestUserPermission}) => {
  const [requestOk, setrequestOk] = useState(false);
  const [notifOk, setNotifOk] = useState(false);
  const hideDialog = () => setVisible(false);
  const manageConsent = async () => {
    console.log('ici');
    await requestTrackingPermission();
    setrequestOk(true);
    if (notifOk) {
      hideDialog();
    }
  };
  const manageNotif = async () => {
    // NOTIFICATIONS
    requestUserPermission();
    setNotifOk(true);
    if (requestOk) {
      hideDialog();
    }
  };
  const checkClose = async () => {
    if (requestOk) {
      hideDialog();
    } else {
      setNotifOk(true);
    }
  };
  return (
    <View>
      <Portal>
        <Dialog visible={visible} style={{}}>
          <Dialog.Content style={{alignItems: 'center'}}>
            <View>
              <Text style={{textAlign: 'center'}}>
                Deux petites questions avant de commencer 😉
              </Text>
            </View>
            <View style={{marginTop: 20}}>
              <Text>
                Pour vivre l'expérience à fond, autorise les notifications pour
                que l'on puisse t'informer des nouvelles grilles, des nouvelles
                cagnottes, de tes résultats ...
              </Text>
              {notifOk ? (
                <View style={{marginTop: 20}}>
                  <Text style={{textAlign: 'center'}}>
                    Merci pour cette réponse ✅
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Button
                    onPress={manageNotif}
                    uppercase={false}
                    style={{
                      backgroundColor: colors.light,
                      marginTop: 20,
                      width: '45%',
                    }}
                    labelStyle={{color: colors.background}}>
                    OK
                  </Button>
                  <Button
                    onPress={checkClose}
                    uppercase={false}
                    style={{
                      backgroundColor: colors.light,
                      marginTop: 20,
                      width: '45%',
                    }}
                    labelStyle={{color: colors.background}}>
                    Non merci
                  </Button>
                </View>
              )}
            </View>
            <View style={{marginTop: 20}}>
              <Text>
                Nous utilisons la publicité pour pouvoir faire vivre cette
                application gratuitement. Pour être sur que les pubs soient
                pertinentes et interessantes pour toi, nous avons besoin de ton
                accord, merci pour ton soutien
              </Text>
              {requestOk ? (
                <View style={{marginTop: 20}}>
                  <Text style={{textAlign: 'center'}}>
                    Merci pour cette réponse ✅
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Button
                    onPress={manageConsent}
                    uppercase={false}
                    style={{
                      backgroundColor: colors.light,
                      marginTop: 20,
                      width: '45%',
                    }}
                    labelStyle={{color: colors.background}}>
                    Ok
                  </Button>
                  <Button
                    onPress={manageConsent}
                    uppercase={false}
                    style={{
                      backgroundColor: colors.light,
                      marginTop: 20,
                      width: '45%',
                    }}
                    labelStyle={{color: colors.background}}>
                    Non merci
                  </Button>
                </View>
              )}
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

export default NotifModal;
