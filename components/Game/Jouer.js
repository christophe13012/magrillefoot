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
import moment from 'moment';
import BonusStore from '../BonusStore';

const Jouer = ({params}) => {
  const items = useSelector(state => state.items);
  const grilles = useSelector(state => state.grilles);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
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
  const [bonusEnCours, setBonusEnCours] = useState(0);
  const select = (i, c) => {
    const game = [...choix];
    if (game[i].includes(c)) {
      if (game[i].length > 1) {
        // gants
        if (game[i][0].length > 0) {
          if (game[i][0].includes(c)) {
            game[i][0] = game[i][0].filter(x => x != c);
            setBonusEnCours(bonusEnCours - 1);
          } else {
            game[i][0].splice(game[i][0].length - 1);
            setBonusEnCours(bonusEnCours - 1);
          }
        }
      }
      game[i] = game[i].filter(x => x != c || Array.isArray(x));
    } else {
      if (game[i].length > 1) {
        if (items.bonus - bonusEnCours < 1) {
          Toast.show("Tu n'as pas assez de 🍀 pour couvrir ce résultat", {
            position: 70,
            containerStyle: {backgroundColor: colors.warning, width: '90%'},
            textStyle: {color: 'white'},
            duration: 2000,
          });
          return;
        }
        let countBonus = 0;
        game.forEach(element => {
          console.log('element', element);
          element.forEach(x => {
            if (Array.isArray(x)) {
              countBonus += x.length;
            }
          });
        });
        if (countBonus > 5) {
          Toast.show('Tu as atteint le max de 🍀 pour cette grille', {
            position: 70,
            containerStyle: {backgroundColor: colors.warning, width: '90%'},
            textStyle: {color: 'white'},
            duration: 2000,
          });
          return;
        }
        // gants
        game[i][0].push(c);
        setBonusEnCours(bonusEnCours + 1);
      }
      game[i].push(c);
    }
    setChoix(game);
    console.log('game', game);
  };
  const random = () => {
    const randomChoices = [
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
    ];
    const result = [1, 2, 0];
    for (let index = 0; index < 14; index++) {
      const random = Math.floor(Math.random() * 3);
      randomChoices[index][1] = result[random];
    }
    setChoix(randomChoices);
    setBonusEnCours(0);
  };
  const reset = () => {
    const firstChoices = [
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
    ];
    setChoix(firstChoices);
    setBonusEnCours(0);
  };
  const renderChoice = (c, i) => {
    if (choix[i].includes(c) && !choix[i][0].includes(c)) {
      return (
        <Text
          style={
            c == 0
              ? {
                  fontSize: 18,
                  position: 'absolute',
                }
              : c == 1
              ? {
                  fontSize: 18,
                  marginLeft: 3,
                }
              : {
                  fontSize: 18,
                }
          }>
          ⚽
        </Text>
      );
    } else if (choix[i][0].includes(c)) {
      return (
        <Text
          style={
            c == 0
              ? {
                  fontSize: 22,
                  position: 'absolute',
                }
              : c == 1
              ? {
                  fontSize: 22,
                }
              : {
                  fontSize: 22,
                }
          }>
          🍀
        </Text>
      );
    } else {
      return <View style={{width: 10}}></View>;
    }
  };
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
                marginRight: 5,
                color: colors.white,
              }}>
              {items.coins - 50}
            </Text>
            <Image
              style={{
                width: 25,
                height: 25,
              }}
              source={require('../../images/coin.png')}
            />
          </View>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{
              backgroundColor: colors.light,
              alignItems: 'center',
              justifyContent: 'center',
              height: 20,
              width: 20,
              borderRadius: 5,
              marginRight: 5,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 2}}>
              +
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginRight: 3,
              color: colors.white,
              marginLeft: 3,
            }}>
            {items.bonus - bonusEnCours}
          </Text>
          <Text style={{fontSize: 22, marginLeft: 1}}>🍀</Text>
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
          N'oublies pas d'utiliser tes 🍀 pour couvrir le plus de résultats
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
        <Text style={{marginLeft: '3%', marginBottom: 10}}>
          Grille à valider avant le{' '}
          {moment(new Date(grilles.details.limit)).format('DD/MM à H:mm')}
        </Text>
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
                flexDirection: 'row',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  color: colors.black,
                  flex: 1,
                  textAlign: 'right',
                }}>
                {m.home}
              </Text>
              {renderChoice(1, i)}
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
                  paddingHorizontal: 5,
                  flex: 1,
                  textAlign: 'center',
                }}>
                Nul
              </Text>
              {renderChoice(0, i)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => select(i, 2)}
              style={{
                borderRadius: 5,
                backgroundColor: choix[i].includes(2)
                  ? colors.light
                  : colors.backLight,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                flex: 1,
              }}>
              {renderChoice(2, i)}
              <Text
                numberOfLines={1}
                style={{color: colors.black, flex: 1, textAlign: 'left'}}>
                {m.away}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
          <Button
            onPress={random}
            uppercase={false}
            style={{backgroundColor: colors.light, flex: 1, marginRight: 10}}
            labelStyle={{color: colors.background}}>
            Je crois au hasard 🤞
          </Button>
          <Button
            onPress={reset}
            uppercase={false}
            style={{backgroundColor: colors.danger}}
            labelStyle={{color: colors.white}}>
            Reset
          </Button>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
            marginTop: 20,
          }}>
          <Button
            onPress={random}
            uppercase={true}
            style={{
              backgroundColor: colors.background,
              flex: 1,
              marginRight: 10,
            }}
            labelStyle={{color: colors.white}}>
            Valider ma grille 🔥
          </Button>
        </View>
        <View style={{marginBottom: 50}}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 18,
              marginLeft: 10,
              color: colors.black,
              marginTop: 20,
            }}>
            Répartition des gains
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              marginTop: 10,
            }}>
            <View>
              <Text style={{marginBottom: 5}}>0 fautes</Text>
              <Text style={{marginBottom: 5}}>1 fautes</Text>
              <Text style={{marginBottom: 5}}>2 fautes</Text>
              <Text style={{marginBottom: 5}}>3 fautes</Text>
              <Text>4 fautes</Text>
            </View>
            <View style={{marginLeft: 5}}>
              <Text style={{marginBottom: 5}}>👉</Text>
              <Text style={{marginBottom: 5}}>👉</Text>
              <Text style={{marginBottom: 5}}>👉</Text>
              <Text style={{marginBottom: 5}}>👉</Text>
              <Text>👉</Text>
            </View>
            <View style={{marginLeft: 5}}>
              <Text style={{marginBottom: 5}}>1000€</Text>
              <Text style={{marginBottom: 5}}>1000 points</Text>
              <Text style={{marginBottom: 5}}>500 points</Text>
              <Text style={{marginBottom: 5}}>150 points</Text>
              <Text>50 points</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <BonusStore visible={visible} setVisible={setVisible} inGame={50} />
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
