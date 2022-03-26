import React, {cloneElement, Component, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {colors} from '../utils/colors';
import {useSelector} from 'react-redux';
import {Button, Dialog, Portal, Card} from 'react-native-paper';
import InputSpinner from 'react-native-input-spinner';
import Toast from 'react-native-tiny-toast';
import {updateBonus} from '../Services/http';

const BonusStore = ({visible, setVisible}) => {
  const items = useSelector(state => state.items);
  const hideDialog = () => setVisible(false);
  const [sur, setSur] = useState(false);
  const [panier, setPanier] = useState(0);
  const buy = () => {
    const bonusBuyable = Math.floor((items.coins - 50) / 100);
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
    console.log('doBuy', panier);
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
          <Dialog.Title style={{textAlign: 'center'}}>Store</Dialog.Title>
          <Dialog.Content style={{alignItems: 'center'}}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                flexDirection: 'row',
              }}>
              <Card
                style={{
                  width: 60,
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{marginTop: 13}}>
                  <Text style={{fontSize: 30}}>🍀</Text>
                </View>
              </Card>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Text>100</Text>
                <Image
                  style={{
                    width: 25,
                    height: 25,
                    marginLeft: 3,
                  }}
                  source={require('../images/coin.png')}
                />
              </View>
            </View>
            <View>
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                Couvres plus de résultats possibles sur tes grilles
              </Text>
            </View>
            <View style={{marginTop: 20, width: '50%'}}>
              <InputSpinner
                max={Math.floor((items.coins - 50) / 100) + 1}
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
            <Button onPress={hideDialog}>Retour</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default BonusStore;
