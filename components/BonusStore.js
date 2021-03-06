import React, {cloneElement, Component, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {colors} from '../utils/colors';
import {useSelector} from 'react-redux';
import {Button, Dialog, Portal, Card} from 'react-native-paper';
import InputSpinner from 'react-native-input-spinner';
import Toast from 'react-native-tiny-toast';
import {updateBonus} from '../Services/http';

const BonusStore = ({visible, setVisible, inGame}) => {
  const items = useSelector(state => state.items);
  const hideDialog = () => setVisible(false);
  const [sur, setSur] = useState(false);
  const [panier, setPanier] = useState(0);
  const buy = () => {
    const bonusBuyable = Math.floor((items.coins - inGame) / 100);
    if (bonusBuyable >= panier) {
      setSur(true);
    } else {
      Toast.show("Tu n'as pas assez de coin pour acheter tout ça !", {
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
  const doBuy = async () => {
    await updateBonus(panier);
    setPanier(0);
    setSur(false);
    hideDialog();
  };
  const changePanier = num => {
    setPanier(num);
    setSur(false);
  };
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{}}>
          <Dialog.Title style={{textAlign: 'center', fontSize: 15}}>
            Couvres le plus de résultats possibles sur tes grilles
          </Dialog.Title>
          <Dialog.Content style={{alignItems: 'center'}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                flexDirection: 'row',
                marginTop: 20,
              }}>
              <Card
                style={{
                  width: 60,
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{marginTop: 13}}>
                  <Text style={{fontSize: 30}}>💊</Text>
                </View>
              </Card>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 30,
                }}>
                <Text style={{fontWeight: 'bold'}}>100 💎</Text>
              </View>
            </View>
            <View style={{marginTop: 20, width: '50%'}}>
              <InputSpinner
                max={Math.floor((items.coins - inGame) / 100) + 1}
                min={0}
                colorMax={'#F78E2C'}
                value={panier}
                onChange={num => changePanier(num)}
                color={'#303A7E'}
                onMax={() =>
                  Toast.show(
                    "Tu n'as pas assez de coin pour acheter tout ça !",
                    {
                      position: 70,
                      containerStyle: {
                        backgroundColor: colors.warning,
                        width: '90%',
                      },
                      textStyle: {color: 'white'},
                      duration: 2000,
                    },
                  )
                }
              />
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold'}}>
                Total : {panier * 100} 💎
              </Text>
            </View>
            {sur ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{marginTop: 20}}>Tu confirmes ?</Text>
                <Button
                  onPress={doBuy}
                  uppercase={false}
                  style={{
                    backgroundColor: colors.light,
                    marginTop: 20,
                    marginHorizontal: 10,
                  }}
                  labelStyle={{color: colors.background}}>
                  Oui
                </Button>
                <Button
                  onPress={() => setSur(false)}
                  uppercase={false}
                  style={{
                    backgroundColor: colors.danger,
                    marginTop: 20,
                  }}
                  labelStyle={{color: colors.white}}>
                  Non
                </Button>
              </View>
            ) : (
              <View>
                <Button
                  onPress={buy}
                  uppercase={false}
                  disabled={panier == 0}
                  style={{
                    backgroundColor: colors.light,
                    marginTop: 20,
                  }}
                  labelStyle={{color: colors.background}}>
                  Acheter
                </Button>
              </View>
            )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>
              <Text style={{color: colors.background}}>Fermer</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default BonusStore;
