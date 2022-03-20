import React, {Component, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {colors} from '../../utils/colors';
import {Button} from 'react-native-paper';
import {initalizeItems, isNameTaken, saveName} from '../../Services/http';
import Toast from 'react-native-tiny-toast';
import auth from '@react-native-firebase/auth';
import {connect, useDispatch} from 'react-redux';
import {save_items} from '../../Store/actions';
import {useNavigation} from '@react-navigation/native';

const Jouer = ({params}) => {
  const items = useSelector(state => state.items);
  const grilles = useSelector(state => state.grilles);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [choix, setChoix] = useState([
    [[]],
    [[]],
    [[]],
    [[]],
    [[]],
    [[]],
    [[]],
    [[]],
    [[]],
    [[]],
    [[]],
    [[]],
    [[]],
    [[]],
  ]);
  const select = (i, c) => {
    const game = [...choix];
    if (game[i].includes(c)) {
      if (game[i].length > 1) {
        // gants
        if (game[i][0].length > 0) {
          if (game[i][0].includes(c)) {
            game[i][0] = game[i][0].filter(x => x != c);
          } else {
            game[i][0].splice(game[i][0].length - 1);
          }
        }
      }
      console.log('game i avant', game[i]);
      game[i] = game[i].filter(x => x != c || Array.isArray(x));
      console.log('game i apres', game[i]);
    } else {
      if (game[i].length > 1) {
        // gants
        game[i][0].push(c);
      }
      game[i].push(c);
    }
    setChoix(game);
    console.log('game', game);
  };

  console.log('choix', choix);
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={{
            width: 30,
            height: 30,
            marginLeft: 20,
          }}
          source={require('../../images/arrow-down.png')}
        />
      </TouchableOpacity>
      <View
        style={{
          height: 100,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginRight: 3,
                color: colors.white,
              }}>
              {items.coins}
            </Text>
            <Image
              style={{
                width: 30,
                height: 30,
              }}
              source={require('../../images/coin.png')}
            />
          </View>
          <View
            style={{
              backgroundColor: colors.light,
              alignItems: 'center',
              justifyContent: 'center',
              height: 25,
              width: 25,
              borderRadius: 5,
              marginRight: 5,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 2}}>
              +
            </Text>
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginRight: 3,
              color: colors.white,
              marginLeft: 3,
            }}>
            {items.shield}
          </Text>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={require('../../images/glove.png')}
          />
        </View>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 22,
            marginLeft: 10,
            color: colors.white,
            marginTop: 20,
          }}>
          À toi de remplir la grille
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 11,
            marginLeft: 10,
            color: colors.white,
          }}>
          N'oublies pas d'utiliser tes gants pour couvrir le plus de résultats
          possibles
        </Text>
      </View>
      <View style={{height: 20, backgroundColor: colors.white}}>
        <View
          style={{
            backgroundColor: colors.background,
            flex: 1,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}></View>
      </View>
      <ScrollView
        style={{flex: 1, backgroundColor: colors.white, paddingTop: 20}}>
        {grilles.matches[grilles.details.actual].matches.map((m, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              paddingHorizontal: '3%',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => select(i, 1)}
              style={{
                backgroundColor: choix[i].includes(1)
                  ? colors.light
                  : colors.backLight,
                borderRadius: 5,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: colors.black, paddingVertical: 5}}>
                {m.home}
              </Text>
              {choix[i][0].includes(1) && (
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    right: 10,
                  }}
                  source={require('../../images/glove.png')}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => select(i, 0)}
              style={{
                borderRadius: 5,
                backgroundColor: choix[i].includes(0)
                  ? colors.light
                  : colors.backLight,
                marginHorizontal: '2%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: colors.black,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                }}>
                Nul
              </Text>
              {choix[i][0].includes(0) && (
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    position: 'absolute',
                  }}
                  source={require('../../images/glove.png')}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => select(i, 2)}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
                backgroundColor: choix[i].includes(2)
                  ? colors.light
                  : colors.backLight,
                flex: 1,
              }}>
              <Text style={{color: colors.black, paddingVertical: 5}}>
                {m.away}
              </Text>
              {choix[i][0].includes(2) && (
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    right: 10,
                  }}
                  source={require('../../images/glove.png')}
                />
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '50%',
  },
});

export default Jouer;
