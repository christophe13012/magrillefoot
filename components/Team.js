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
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {firebase} from '@react-native-firebase/auth';
import {firebase as firebaseApp} from '@react-native-firebase/database';
import {connect, useDispatch} from 'react-redux';
import {save_items} from '../Store/actions';
import {useNavigation} from '@react-navigation/native';
import {codeByTeam, getTeam, removeTeam} from '../Services/http';
import {levels} from '../utils/utils';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-tiny-toast';

const database = firebaseApp
  .app()
  .database(
    'https://magrillefoot-default-rtdb.europe-west1.firebasedatabase.app/',
  );

const mapDispatchToProps = dispatch => {
  return {
    save_items: items => dispatch(save_items(items)),
  };
};

const Team = ({route}) => {
  const navigation = useNavigation();
  const [team, setTeam] = useState([]);
  const [delMode, setDelMode] = useState(false);
  const [teamName, setTeamName] = useState('');
  const dispatch = useDispatch();
  const [mode, setMode] = useState(1);
  const [friends, setFriends] = useState([]);
  const items = useSelector(state => state.items);
  const uid = firebase.auth().currentUser.uid;
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const {team: teamName} = route.params;
    const team = await getTeam(teamName);
    const sorted = Object.values(team).sort((a, b) => {
      return b.coins - a.coins;
    });
    setTeam(sorted);
    setTeamName(teamName);
  };
  const share = async () => {
    const code = await codeByTeam(teamName);
    Clipboard.setString(code);
    Toast.show("C'est copié, fais tourner le code de ta team maintenant !!", {
      position: 70,
      containerStyle: {
        backgroundColor: colors.warning,
        width: '90%',
      },
      textStyle: {color: 'white'},
      duration: 2000,
    });
  };
  const deleteTeam = async () => {
    await removeTeam(teamName);
    navigation.navigate('Amis');
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
            width: 25,
            height: 25,
            marginLeft: 10,
            marginTop: 10,
          }}
          source={require('../images/chevron-left.png')}
        />
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 15}}
        style={{
          paddingHorizontal: 6,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
            paddingLeft: 19,
            marginBottom: 0,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            Team {teamName.substr(0, 1).toUpperCase() + teamName.substr(1)} 🔥
          </Text>
        </View>
        <SafeAreaView
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginBottom: 20,
              justifyContent: 'center',
              flex: 1,
            }}>
            {!delMode && (
              <Button
                uppercase={false}
                style={{backgroundColor: colors.light, marginRight: 10}}
                onPress={share}>
                <Text>Partager le code</Text>
              </Button>
            )}
            {!delMode ? (
              <Button
                uppercase={false}
                onPress={() => setDelMode(true)}
                style={{
                  backgroundColor: '#D9534F',
                }}>
                <Text style={{color: 'white'}}>Quitter la team</Text>
              </Button>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 150,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 5,
                  }}>
                  <Text
                    style={{fontSize: 11, textAlign: 'center', color: 'white'}}>
                    Es-tu sur de vouloir quitter cette team ?
                  </Text>
                </View>
                <Button
                  small
                  onPress={deleteTeam}
                  style={{
                    justifyContent: 'center',
                    backgroundColor: '#D9534F',
                    marginRight: 5,
                  }}>
                  <Text style={{alignSelf: 'center', color: 'white'}}>Oui</Text>
                </Button>
                <Button
                  small
                  onPress={() => setDelMode(false)}
                  style={{
                    justifyContent: 'center',
                    backgroundColor: '#8DD3B7',
                  }}>
                  <Text style={{alignSelf: 'center', color: 'white'}}>Non</Text>
                </Button>
              </View>
            )}
          </View>
        </SafeAreaView>
        {team.slice(0, 5).map((poto, id) => {
          return (
            <View
              key={id}
              style={{
                paddingHorizontal: 15,
                borderRadius: 10,
                marginBottom: 5,
                height: 50,
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: 'white',
              }}>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor:
                    firebase.auth().currentUser.uid == poto.uid
                      ? colors.light
                      : colors.background,
                  height: 35,
                  width: 35,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Text
                  style={{
                    color:
                      firebase.auth().currentUser.uid == poto.uid
                        ? colors.background
                        : 'white',
                  }}>
                  {id + 1}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingLeft: 10,
                  height: 40,
                  justifyContent: 'space-around',
                }}>
                <Text>
                  {poto.name.substr(0, 1).toUpperCase() + poto.name.substr(1)}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 12}}>
                    {levels[poto.niveau] && levels[poto.niveau].name}
                  </Text>
                </View>
              </View>
              <React.Fragment>
                <Text
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'right',
                    fontSize: 14,
                    width: 50,
                    marginRight: 5,
                    marginLeft: 10,
                  }}>
                  {poto.coins ? poto.coins : 0}
                </Text>
                <Image
                  style={{
                    height: 15,
                    width: 15,
                  }}
                  source={require('../images/coin.png')}
                />
              </React.Fragment>
            </View>
          );
        })}
        {team.length > 4 && (
          <Button
            small
            style={{
              backgroundColor: '#F78E2C',
              alignSelf: 'flex-end',
              marginTop: 5,
            }}
            onPress={() =>
              this.props.navigation.navigate('TeamComplet', {
                classement: team,
                teamName: this.props.navigation.state.params.team,
              })
            }
            block>
            <Text
              style={{
                fontSize: 12,
              }}>
              Voir le classement complet
            </Text>
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(null, mapDispatchToProps)(Team);
