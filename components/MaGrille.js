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
import {useSelector} from 'react-redux';
import {connect} from 'react-redux';
import {save_items} from '../Store/actions';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {repartitionG} from '../utils/utils';
import {IconButton} from 'react-native-paper';

const mapDispatchToProps = dispatch => {
  return {
    save_items: items => dispatch(save_items(items)),
  };
};

const MaGrille = ({route}) => {
  const grilles = useSelector(state => state.grilles);
  const {id, game} = route.params;
  const navigation = useNavigation();
  renderBackground = (i, index) => {
    if (game[i].includes(index)) {
      if (index == grilles.matches[id].results?.[i]) {
        return colors.light;
      } else {
        //return colors.danger;
        return colors.light;
      }
    } else {
      return colors.backLight;
    }
  };
  const renderChoice = (i, index) => {
    if (grilles.matches[id].results?.[i] == null) {
      return;
    }
    if (game[i].includes(index)) {
      if (index == grilles.matches[id].results?.[i]) {
        return (
          <Text
            style={
              index == 0
                ? {
                    fontSize: 15,
                    position: 'absolute',
                  }
                : index == 1
                ? {
                    fontSize: 15,
                    marginRight: 3,
                  }
                : {
                    fontSize: 15,
                    marginLeft: 3,
                  }
            }>
            ✅
          </Text>
        );
      } else {
        return (
          <Text
            style={
              index == 0
                ? {
                    fontSize: 15,
                    position: 'absolute',
                  }
                : index == 1
                ? {
                    fontSize: 15,
                    marginRight: 3,
                  }
                : {
                    fontSize: 15,
                    marginLeft: 3,
                  }
            }>
            ❌
          </Text>
        );
      }
    } else {
      if (grilles.matches[id].results?.[i] == index) {
        return (
          <Text
            style={
              index == 0
                ? {
                    fontSize: 15,
                    position: 'absolute',
                  }
                : index == 1
                ? {
                    fontSize: 15,
                    marginRight: 3,
                  }
                : {
                    fontSize: 15,
                    marginLeft: 3,
                  }
            }>
            ☑️
          </Text>
        );
      }
    }
  };
  const renderResult = wrong => {
    if (repartitionG[wrong]) {
      return repartitionG[wrong];
    } else {
      return '15 points';
    }
  };
  const played = grilles.matches[id]?.results
    ? Object.values(grilles.matches[id].results).filter(x => x != null).length
    : 0;
  const wrong = grilles.matches[id].results.filter(
    (x, i) => !game[i].includes(x),
  ).length;
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={{
            width: 25,
            height: 25,
            marginLeft: 10,
            marginTop: 10,
          }}
          source={require('../images/chevron-left.png')}
        />
      </TouchableOpacity>
      <View
        style={{
          height: 70,
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
              Grille #{grilles.matches[id].num}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginRight: 5,
                color: colors.white,
                marginTop: 10,
              }}>
              Résultats le{' '}
              {moment(new Date(grilles.matches[id].result)).format('DD/MM')}
            </Text>
          </View>
        </View>
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
        {grilles.matches[id].limit > Date.now() ? (
          <Text style={{marginLeft: '3%', marginBottom: 10}}>
            Les matches n'ont pas encore débutés 🏟️
          </Text>
        ) : (
          <Text style={{marginLeft: '3%', marginBottom: 10}}>
            {14 - played} matches restants à jouer ⚽
          </Text>
        )}
        {grilles.matches[id].matches.map((m, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              paddingHorizontal: '3%',
              marginBottom: 10,
            }}>
            <View
              style={{
                backgroundColor: renderBackground(i, 1),
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
                  marginRight: 3,
                }}>
                {m.home}
              </Text>
              {renderChoice(i, 1)}
            </View>
            <View
              style={{
                borderRadius: 5,
                backgroundColor: renderBackground(i, 0),
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
              {renderChoice(i, 0)}
            </View>
            <View
              style={{
                borderRadius: 5,
                backgroundColor: renderBackground(i, 2),
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                flex: 1,
              }}>
              {renderChoice(i, 2)}
              <Text
                numberOfLines={1}
                style={{
                  marginLeft: 3,
                  color: colors.black,
                  flex: 1,
                  textAlign: 'left',
                }}>
                {m.away}
              </Text>
            </View>
          </View>
        ))}
        <View style={{}}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 18,
              marginLeft: 10,
              color: colors.black,
              marginTop: 20,
            }}>
            Mes résultats
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              marginTop: 10,
            }}>
            <View style={{}}>
              <Text style={{}}>
                {wrong} fautes ➡️{' '}
                {played < 14
                  ? 14 - played + ' matches restants à jouer'
                  : renderResult(wrong)}
              </Text>
            </View>
          </View>
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
              <Text style={{marginBottom: 5}}>➡️</Text>
              <Text style={{marginBottom: 5}}>➡️</Text>
              <Text style={{marginBottom: 5}}>➡️</Text>
              <Text style={{marginBottom: 5}}>➡️</Text>
              <Text>➡️</Text>
            </View>
            <View style={{marginLeft: 5}}>
              {repartitionG.map((x, i) => (
                <Text key={i} style={{marginBottom: 5}}>
                  {x}
                </Text>
              ))}
            </View>
            {grilles.matches[id].repartition && (
              <View style={{marginLeft: 5}}>
                <Text style={{marginBottom: 5}}>
                  🔥 {grilles.matches[id].repartition[0]} joueurs
                </Text>
                <Text style={{marginBottom: 5}}>
                  🔥 {grilles.matches[id].repartition[1]} joueurs
                </Text>
                <Text style={{marginBottom: 5}}>
                  🔥 {grilles.matches[id].repartition[2]} joueurs
                </Text>
                <Text style={{marginBottom: 5}}>
                  🔥 {grilles.matches[id].repartition[3]} joueurs
                </Text>
                <Text>🔥 {grilles.matches[id].repartition[4]} joueurs</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(null, mapDispatchToProps)(MaGrille);
