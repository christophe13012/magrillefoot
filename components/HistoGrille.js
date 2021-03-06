import React, {useState} from 'react';
import {View, Text, SafeAreaView, Platform, ScrollView} from 'react-native';
import {colors} from '../utils/colors';
import {IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {connect, useDispatch} from 'react-redux';
import {save_items} from '../Store/actions';
import {useNavigation} from '@react-navigation/native';
import {repartitionG} from '../utils/utils';
import moment from 'moment';

const mapDispatchToProps = dispatch => {
  return {
    save_items: items => dispatch(save_items(items)),
  };
};

const HistoGrille = ({route}) => {
  const grilles = useSelector(state => state.grilles);
  const {id} = route.params;
  console.log('id', id, grilles.matches[id]);
  const navigation = useNavigation();
  const [team, setTeam] = useState([]);
  const [delMode, setDelMode] = useState(false);
  const [teamName, setTeamName] = useState('');
  const dispatch = useDispatch();
  const [mode, setMode] = useState(1);
  const [friends, setFriends] = useState([]);
  const items = useSelector(state => state.items);
  const played = grilles.matches[id]?.results
    ? Object.values(grilles.matches[id].results).filter(x => x != null).length
    : 0;
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}>
      <IconButton
        icon="chevron-left"
        color={colors.white}
        size={30}
        onPress={() => navigation.goBack()}
        style={{position: 'absolute', zIndex: 100}}
      />
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
              R??sultats le{' '}
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
            Grille ?? valider avant le{' '}
            {moment(new Date(grilles.matches[id].limit)).format('DD/MM ?? H:mm')}
          </Text>
        ) : (
          <Text style={{marginLeft: '3%', marginBottom: 10}}>
            {14 - played} matches restants ?? jouer ???
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
                backgroundColor: colors.backLight,
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
              {grilles.matches[id].results &&
                grilles.matches[id].results?.[i] == 1 && (
                  <Text style={{marginRight: 3}}>??????</Text>
                )}
            </View>
            <View
              style={{
                borderRadius: 5,
                backgroundColor: colors.backLight,
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
              {grilles.matches[id].results &&
                grilles.matches[id].results?.[i] == 0 && (
                  <Text style={{position: 'absolute'}}>??????</Text>
                )}
            </View>
            <View
              style={{
                borderRadius: 5,
                backgroundColor: colors.backLight,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                flex: 1,
              }}>
              {grilles.matches[id].results &&
                grilles.matches[id].results?.[i] == 2 && (
                  <Text style={{marginLeft: 3}}>??????</Text>
                )}
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
        <View style={{marginBottom: 50}}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 18,
              marginLeft: 10,
              color: colors.black,
              marginTop: 20,
            }}>
            R??partition des gains
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
              <Text style={{marginBottom: 5}}>????</Text>
              <Text style={{marginBottom: 5}}>????</Text>
              <Text style={{marginBottom: 5}}>????</Text>
              <Text style={{marginBottom: 5}}>????</Text>
              <Text>????</Text>
            </View>
            <View style={{marginLeft: 5}}>
              {repartitionG.map((x, i) => (
                <Text key={i} style={{marginBottom: 5}}>
                  {i == 0
                    ? Platform.os == 'ios'
                      ? grilles.details.premier.ios
                      : grilles.details.premier.android
                    : x}
                </Text>
              ))}
            </View>
            {grilles.matches[id].repartition && (
              <View style={{marginLeft: 5}}>
                <Text style={{marginBottom: 5}}>
                  ???? {grilles.matches[id].repartition[0]} joueurs
                </Text>
                <Text style={{marginBottom: 5}}>
                  ???? {grilles.matches[id].repartition[1]} joueurs
                </Text>
                <Text style={{marginBottom: 5}}>
                  ???? {grilles.matches[id].repartition[2]} joueurs
                </Text>
                <Text style={{marginBottom: 5}}>
                  ???? {grilles.matches[id].repartition[3]} joueurs
                </Text>
                <Text>???? {grilles.matches[id].repartition[4]} joueurs</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(null, mapDispatchToProps)(HistoGrille);
