import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {colors} from '../utils/colors';
import {Button, Paragraph, Dialog, Portal, Provider} from 'react-native-paper';
import {updateItems} from '../Services/http';

const Ballons = ({ballons}) => {
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const open = async (ballon, id) => {
    setValue(ballon.value);
    await updateItems(ballon, id);
    showDialog();
  };
  let charged = false;
  ballons &&
    ballons.forEach(element => {
      if (element.active) charged = true;
    });
  return (
    <View
      style={{
        flex: 1,
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
        Récupère un max de pièces
      </Text>
      <View style={{backgroundColor: colors.back, borderRadius: 15}}>
        {charged ? (
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              backgroundColor: colors.back,
              height: 100,
              alignItems: 'center',
              paddingHorizontal: 15,
              borderRadius: 15,
            }}
            style={{borderRadius: 15}}>
            {ballons.map((ballon, i) => {
              console.log('ballon', ballon);
              return (
                ballon.active && (
                  <TouchableOpacity
                    key={i}
                    style={{marginRight: 8}}
                    onPress={() => open(ballon, i)}>
                    <Image
                      style={{
                        width: 55,
                        height: 55,
                        marginRight: 10,
                      }}
                      source={require('../images/baby.png')}
                    />
                  </TouchableOpacity>
                )
              );
            })}
          </ScrollView>
        ) : (
          <View
            style={{
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ff4444',
                borderRadius: 5,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  padding: 5,
                  fontSize: 14,
                  overflow: 'hidden',
                  borderRadius: 5,
                }}>
                Tu as récolté toutes tes pièces du jour 👍
              </Text>
              <Text
                style={{
                  backgroundColor: '#ff4444',
                  color: 'white',
                  padding: 5,
                  fontSize: 14,
                  overflow: 'hidden',
                  borderRadius: 5,
                }}>
                Les ballons sont bientôt de retour 😉
              </Text>
            </View>
          </View>
        )}
      </View>
      <Text style={{marginTop: 10, alignSelf: 'flex-end', color: colors.white}}>
        Clique sur chaque ballon pour faire le plein
      </Text>
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Bravo</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <View>
                    <Text>Tu as gagné {value}</Text>
                  </View>
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      marginLeft: 3,
                    }}
                    source={require('../images/coin.png')}
                  />
                </View>
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </View>
  );
};

export default Ballons;
