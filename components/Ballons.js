import React, {useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {colors} from '../utils/colors';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  ActivityIndicator,
} from 'react-native-paper';
import {updateItems} from '../Services/http';
import Toast from 'react-native-tiny-toast';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';

const Ballons = ({
  ballons,
  loading,
  animation,
  value,
  open,
  disableAnimation,
}) => {
  const [visible, setVisible] = useState(false);
  const hideDialog = () => setVisible(false);
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
      {animation && (
        <LottieView
          autoPlay
          onAnimationFinish={disableAnimation}
          loop={false}
          resizeMode="center"
          style={{zIndex: 100}}
          source={require('../images/confettis.json')}
        />
      )}
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
          loading ? (
            <View
              style={{
                height: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator color={colors.background} />
            </View>
          ) : (
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
                return (
                  ballon.active && (
                    <Animatable.View
                      animation="pulse"
                      iterationCount="infinite"
                      iterationDelay={i * 1000}
                      key={i}>
                      <TouchableOpacity
                        key={i}
                        style={{marginRight: 8}}
                        onPress={() => open(ballon, i)}>
                        <Text style={{fontSize: 60}}>⚽</Text>
                      </TouchableOpacity>
                      {ballon.ad && (
                        <View
                          style={{
                            backgroundColor: colors.danger,
                            borderRadius: 50,
                            width: 20,
                            height: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            right: 10,
                          }}>
                          <Text style={{fontSize: 5}}>Avec</Text>
                          <Text style={{fontSize: 7, fontWeight: 'bold'}}>
                            PUB
                          </Text>
                        </View>
                      )}
                    </Animatable.View>
                  )
                );
              })}
            </ScrollView>
          )
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
                Tu as récolté toutes tes pièces dispos 👍
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
                    <Text>Tu as gagné {value} 💎</Text>
                  </View>
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
