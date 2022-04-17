import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {colors} from '../../../utils/colors';
import {Button, TextInput} from 'react-native-paper';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Item, Form, Spinner} from 'native-base';
import {firebase} from '@react-native-firebase/auth';
import Toast from 'react-native-tiny-toast';
import {getItems, updateCoins, updateAllItems} from '../../../Services/http';

const CreateAccount = ({items, hideModal, reloadItems}) => {
  const [alreadyAnAccount, setAlreadyAnAccount] = useState(false);
  return !alreadyAnAccount ? (
    <Formik
      initialValues={{
        displayName: '',
        email: '',
        password: '',
        passwordConfirm: '',
      }}
      onSubmit={async values => {
        try {
          const email = values.email.trim();
          const provider = firebase.auth.EmailAuthProvider;
          const authCredential = provider.credential(email, values.password);
          const infos = await firebase
            .auth()
            .currentUser.linkWithCredential(authCredential);
          const coins = items.coins + 300;
          updateCoins(coins);
          Toast.show('Bravo, tu gagnes 300 coins...', {
            position: 70,
            containerStyle: {
              backgroundColor: colors.warning,
              width: '90%',
            },
            textStyle: {color: 'white'},
            duration: 2000,
          });
          hideModal(false);
        } catch (error) {
          console.log('error', error);
          Toast.show(
            'Oops, un problème a eu lieu, peut-être ce mail est déjà utilisé ? 🤔',
            {
              position: 70,
              containerStyle: {
                backgroundColor: colors.warning,
                width: '90%',
              },
              textStyle: {color: 'white'},
              duration: 3500,
            },
          );
        }
      }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .trim()
          .label('Email')
          .email("Merci d'entrer un email valide")
          .required('Saisie obligatoire'),
        password: yup
          .string()
          .label('Password')
          .required('Saisie obligatoire')
          .min(6, 'Le mot de passe doit faire plus de 6 caractères'),
        passwordConfirm: yup
          .string()
          .oneOf([yup.ref('password')], 'le mot de passe de correspond pas')
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
        <View style={{paddingTop: 20}}>
          <Text
            style={{
              alignSelf: 'center',
              color: colors.background,
              textTransform: 'uppercase',
            }}>
            Je créé mon compte
          </Text>
          <Form style={{}}>
            <View
              style={{
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Item
                style={{
                  marginTop: 10,
                  marginLeft: 0,
                }}>
                <TextInput
                  autoCapitalize="none"
                  onBlur={() => setFieldTouched('email')}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  mode="outlined"
                  label="Email"
                  placeholder="Saisie ton email"
                  theme={{
                    colors: {
                      primary: colors.background,
                      underlineColor: 'transparent',
                    },
                  }}
                  style={{width: '90%'}}
                />
              </Item>
              {touched.email && errors.email && (
                <Text style={{fontSize: 10, color: 'red', marginTop: 5}}>
                  {errors.email}
                </Text>
              )}
              <Item style={{marginLeft: 0, marginTop: 10}}>
                <TextInput
                  autoCapitalize="none"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  mode="outlined"
                  label="Mot de passe"
                  placeholder="Saisie ton mot de passe"
                  theme={{
                    colors: {
                      primary: colors.background,
                      underlineColor: 'transparent',
                    },
                  }}
                  style={{width: '90%'}}
                />
              </Item>
              {touched.password && errors.password && (
                <Text style={{fontSize: 10, color: 'red', marginTop: 5}}>
                  {errors.password}
                </Text>
              )}
              <Item style={{marginLeft: 0, marginTop: 10}}>
                <TextInput
                  autoCapitalize="none"
                  onChangeText={handleChange('passwordConfirm')}
                  onFocus={() => setFieldTouched('passwordConfirm')}
                  onBlur={() => setFieldTouched('passwordConfirm')}
                  mode="outlined"
                  label="Mot de passe"
                  placeholder="Saisie ton mot de passe"
                  theme={{
                    colors: {
                      primary: colors.background,
                      underlineColor: 'transparent',
                    },
                  }}
                  style={{width: '90%'}}
                />
              </Item>
              {touched.passwordConfirm && errors.passwordConfirm && (
                <Text style={{fontSize: 10, color: 'red', marginTop: 5}}>
                  {errors.passwordConfirm}
                </Text>
              )}

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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <Button transparent onPress={() => setAlreadyAnAccount(true)}>
                  <Text style={{color: 'black', fontSize: 12}}>
                    Déjà un compte ?
                  </Text>
                </Button>
              </View>
            </View>
          </Form>
        </View>
      )}
    </Formik>
  ) : (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={async values => {
        try {
          const email = values.email.trim();
          const infos = await firebase
            .auth()
            .signInWithEmailAndPassword(email, values.password);
          const userItems = await getItems();
          reloadItems(userItems);
          hideModal(false);
        } catch (error) {
          console.log('error', error);
          Toast.show('Email ou mot de passe incorrect', {
            position: 70,
            containerStyle: {
              backgroundColor: colors.warning,
              width: '90%',
            },
            textStyle: {color: 'white'},
            duration: 3500,
          });
        }
      }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .trim()
          .label('Email')
          .email("Merci d'entrer un email valide")
          .required('Saisie obligatoire'),
        password: yup
          .string()
          .label('Password')
          .required('Saisie obligatoire')
          .min(6, 'Le mot de passe doit faire plus de 6 caractères'),
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
        <View style={{paddingTop: 20}}>
          <Text
            style={{
              alignSelf: 'center',
              color: colors.background,
              textTransform: 'uppercase',
            }}>
            Je me connecte
          </Text>
          <Form style={{}}>
            <View
              style={{
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Item
                style={{
                  marginTop: 10,
                  marginLeft: 0,
                }}>
                <TextInput
                  autoCapitalize="none"
                  onBlur={() => setFieldTouched('email')}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  mode="outlined"
                  label="Email"
                  placeholder="Saisie ton email"
                  theme={{
                    colors: {
                      primary: colors.background,
                      underlineColor: 'transparent',
                    },
                  }}
                  style={{width: '90%'}}
                />
              </Item>
              {touched.email && errors.email && (
                <Text style={{fontSize: 10, color: 'red', marginTop: 5}}>
                  {errors.email}
                </Text>
              )}
              <Item style={{marginLeft: 0, marginTop: 10}}>
                <TextInput
                  autoCapitalize="none"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  mode="outlined"
                  label="Mot de passe"
                  placeholder="Saisie ton mot de passe"
                  theme={{
                    colors: {
                      primary: colors.background,
                      underlineColor: 'transparent',
                    },
                  }}
                  style={{width: '90%'}}
                />
              </Item>
              {touched.password && errors.password && (
                <Text style={{fontSize: 10, color: 'red', marginTop: 5}}>
                  {errors.password}
                </Text>
              )}
              <Button
                style={{
                  marginTop: 20,
                  backgroundColor: colors.light,
                  marginHorizontal: 20,
                }}
                labelStyle={{color: colors.background}}
                mode="contained"
                onPress={handleSubmit}>
                Me connecter
              </Button>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <Button transparent onPress={() => setAlreadyAnAccount(false)}>
                  <Text style={{color: 'black', fontSize: 12}}>
                    Créer un nouveau compte ?
                  </Text>
                </Button>
              </View>
            </View>
          </Form>
        </View>
      )}
    </Formik>
  );
};

export default CreateAccount;
