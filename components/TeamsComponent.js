import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {colors} from '../utils/colors';
import {useSelector} from 'react-redux';
import {
  getUniqueId,
  isTeamNameTaken,
  updateAllItems,
  saveTeamName,
  codeByTeam,
  removeTeam,
  teamNameByCode,
  joinTeam,
} from '../Services/http';
import {connect, useDispatch} from 'react-redux';
import {save_items} from '../Store/actions';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-tiny-toast';
import {
  Button,
  Dialog,
  IconButton,
  Portal,
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';
import {Item} from 'native-base';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';

const mapDispatchToProps = dispatch => {
  return {
    save_items: items => dispatch(save_items(items)),
  };
};
const TeamsComponent = ({teams}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [visibleIn, setVisibleIn] = useState(false);
  const [visibleOut, setVisibleOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleTeamsJoin, setVisibleTeamsJoin] = useState(false);
  const [visibleTeamsForm, setVisibleTeamsForm] = useState(false);
  const [code, setCode] = useState('');
  const hideDialog = async () => {
    setVisibleIn(false);
    setCode('');
  };
  const hideDialogOut = async () => {
    setVisibleOut(false);
  };
  const hideForm = async () => {
    setVisibleTeamsForm(false);
  };
  const hideJoin = async () => {
    setVisibleTeamsJoin(false);
  };
  const [mode, setMode] = useState(0);
  const [uniqueId, setUniqueId] = useState(0);
  const items = useSelector(state => state.items);
  useEffect(() => {
    (async () => {
      const id = await getUniqueId();
      setUniqueId(id);
    })();
  }, []);
  const copyToClipboard = text => {
    Clipboard.setString(text);
    Toast.show("C'est copié, maintenant fais tourner 😉", {
      position: 70,
      containerStyle: {
        backgroundColor: colors.warning,
        width: '90%',
      },
      textStyle: {color: 'white'},
      duration: 2000,
    });
  };
  const share = async teamName => {
    const code = await codeByTeam(teamName);
    Clipboard.setString(code);
    console.log('code copié', code);
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
  const deleteTeam = async teamName => {
    await removeTeam(teamName);
    Toast.show('Cette team est bien supprimée de ta liste', {
      position: 70,
      containerStyle: {
        backgroundColor: colors.warning,
        width: '90%',
      },
      textStyle: {color: 'white'},
      duration: 2000,
    });
  };
  return (
    <View style={teams && teams.length > 4 ? {flex: 1} : {height: 430}}>
      <ScrollView
        contentContainerStyle={{}}
        style={{
          backgroundColor: 'white',
          marginTop: 50,
          marginHorizontal: 10,
          borderRadius: 10,
          marginBottom: 30,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: 10,
          }}>
          <Button
            style={{
              marginTop: 10,
              backgroundColor: colors.light,
            }}
            labelStyle={{color: colors.background}}
            mode="contained"
            uppercase={false}
            onPress={() => setVisibleTeamsForm(true)}>
            Créer une team
          </Button>
          <Button
            style={{
              marginTop: 10,
              backgroundColor: colors.light,
            }}
            labelStyle={{color: colors.background}}
            mode="contained"
            uppercase={false}
            onPress={() => setVisibleTeamsJoin(true)}>
            Rejoindre une team
          </Button>
        </View>
        <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
          {teams && teams.length > 0 ? (
            teams.map((team, id) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Team', {team: team})}
                key={id}
                style={{
                  height: 50,
                  backgroundColor: colors.background,
                  marginBottom: 10,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: 'white',
                    height: 35,
                    width: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Text>{id + 1}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flex: 1,
                    }}>
                    <Text style={{color: 'white', fontWeight: '500'}}>
                      {team}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <IconButton
                        icon="share"
                        color={colors.white}
                        size={20}
                        onPress={() => share(team)}
                        style={{alignSelf: 'center'}}
                      />
                      <IconButton
                        icon="delete"
                        color={colors.white}
                        size={20}
                        onPress={() => deleteTeam(team)}
                        style={{alignSelf: 'center'}}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Text>Tu n'as rejoint ou créé aucune team</Text>
            </View>
          )}
        </View>
        <Portal>
          <Dialog
            visible={visibleTeamsForm}
            onDismiss={hideForm}
            style={{
              height: '30%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Formik
              initialValues={{
                displayName: '',
              }}
              onSubmit={async values => {
                setLoading(true);
                const name = values.displayName.trim();
                const nameTaken = await isTeamNameTaken(name);
                if (nameTaken) {
                  Toast.show('Nom de team déja utilisé', {
                    position: 70,
                    containerStyle: {
                      backgroundColor: colors.warning,
                      width: '90%',
                    },
                    textStyle: {color: 'white'},
                    duration: 2000,
                  });
                  setLoading(false);
                } else {
                  const itemsNew = {...items};
                  await saveTeamName(name, itemsNew, items.name);
                  const teams = itemsNew.teams ? itemsNew.teams : [];
                  teams.push(name);
                  itemsNew.teams = teams;
                  await updateAllItems(itemsNew);
                  Toast.show(
                    'Parfait, fais tourner le code de ta team maintenant !!',
                    {
                      position: 70,
                      containerStyle: {
                        backgroundColor: colors.warning,
                        width: '90%',
                      },
                      textStyle: {color: 'white'},
                      duration: 2000,
                    },
                  );
                  setLoading(false);
                  setVisibleTeamsForm(false);
                }
              }}
              validationSchema={yup.object().shape({
                displayName: yup
                  .string()
                  .label('Nom de la team')
                  .required('Saisie obligatoire')
                  .min(4, 'Le nom de la team doit faire plus de 4 caractères')
                  .max(
                    25,
                    'Le nom de la team doit faire moins de 25 caractères',
                  ),
              })}>
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                isValid,
                handleSubmit,
              }) => (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{marginBottom: 10}}>Créé ta team</Text>
                  <React.Fragment>
                    <Item>
                      <TextInput
                        autoCapitalize="none"
                        onBlur={() => setFieldTouched('displayName')}
                        onChangeText={handleChange('displayName')}
                        value={values.displayName}
                        mode="outlined"
                        label="Nom de la team"
                        placeholder="Saisie le nom de la team"
                        theme={{
                          colors: {
                            primary: colors.background,
                            underlineColor: 'transparent',
                          },
                        }}
                        style={{width: '90%'}}
                      />
                    </Item>
                    {touched.displayName && errors.displayName && (
                      <Text style={{fontSize: 10, color: 'red', marginTop: 5}}>
                        {errors.displayName}
                      </Text>
                    )}
                    {loading ? (
                      <ActivityIndicator
                        color={colors.background}
                        style={{marginTop: 20}}
                      />
                    ) : (
                      <Button
                        style={{
                          marginTop: 20,
                          backgroundColor: colors.light,
                          marginHorizontal: 20,
                        }}
                        labelStyle={{color: colors.background}}
                        mode="contained"
                        onPress={handleSubmit}>
                        Valider
                      </Button>
                    )}
                  </React.Fragment>
                </View>
              )}
            </Formik>
          </Dialog>
          <Dialog
            visible={visibleTeamsJoin}
            onDismiss={hideJoin}
            style={{
              height: '30%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Formik
              initialValues={{
                displayName: '',
              }}
              onSubmit={async values => {
                setLoading(true);
                const name = values.displayName.trim();
                const teamName = await teamNameByCode(name);
                if (!teamName) {
                  Toast.show('Team inconnu', {
                    position: 70,
                    containerStyle: {
                      backgroundColor: colors.warning,
                      width: '90%',
                    },
                    textStyle: {color: 'white'},
                    duration: 2000,
                  });
                  setLoading(false);
                } else {
                  const itemsNew = {...items};
                  const teams = items.teams ? items.teams : [];
                  if (teams.includes(teamName)) {
                    Toast.show('Tu fais déjà parti de cette team !!', {
                      position: 70,
                      containerStyle: {
                        backgroundColor: colors.warning,
                        width: '90%',
                      },
                      textStyle: {color: 'white'},
                      duration: 2000,
                    });
                  } else {
                    teams.push(teamName);
                    itemsNew.teams = teams;
                    await updateAllItems(itemsNew);
                    await joinTeam(teamName, itemsNew, items.name);
                    Toast.show('Parfait, à toi de jouer !!', {
                      position: 70,
                      containerStyle: {
                        backgroundColor: colors.warning,
                        width: '90%',
                      },
                      textStyle: {color: 'white'},
                      duration: 2000,
                    });
                  }
                  setLoading(false);
                  setVisibleTeamsJoin(false);
                }
              }}
              validationSchema={yup.object().shape({
                displayName: yup
                  .string()
                  .label('Code de la team')
                  .required('Saisie obligatoire'),
              })}>
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                isValid,
                handleSubmit,
              }) => (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{marginBottom: 10}}>
                    Saisi le code de la team que tu as reçu
                  </Text>
                  <React.Fragment>
                    <Item>
                      <TextInput
                        autoCapitalize="none"
                        onBlur={() => setFieldTouched('displayName')}
                        onChangeText={handleChange('displayName')}
                        value={values.displayName}
                        mode="outlined"
                        label="Code"
                        placeholder="Saisie le code de la team"
                        theme={{
                          colors: {
                            primary: colors.background,
                            underlineColor: 'transparent',
                          },
                        }}
                        style={{width: '90%'}}
                      />
                    </Item>
                    {touched.displayName && errors.displayName && (
                      <Text style={{fontSize: 10, color: 'red', marginTop: 5}}>
                        {errors.displayName}
                      </Text>
                    )}
                    {loading ? (
                      <ActivityIndicator
                        color={colors.background}
                        style={{marginTop: 20}}
                      />
                    ) : (
                      <Button
                        style={{
                          marginTop: 20,
                          backgroundColor: colors.light,
                          marginHorizontal: 20,
                        }}
                        labelStyle={{color: colors.background}}
                        mode="contained"
                        onPress={handleSubmit}>
                        Valider
                      </Button>
                    )}
                  </React.Fragment>
                </View>
              )}
            </Formik>
          </Dialog>
        </Portal>
      </ScrollView>
    </View>
  );
};

export default connect(null, mapDispatchToProps)(TeamsComponent);
