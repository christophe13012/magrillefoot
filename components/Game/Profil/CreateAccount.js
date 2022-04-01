import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {colors} from '../../../utils/colors';
import {Button, TextInput} from 'react-native-paper';
import {useForm, Controller} from 'react-hook-form';

const CreateAccount = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = data => console.log(data);
  return (
    <View
      style={{
        padding: 20,
        paddingVertical: '20%',
      }}>
      <Text
        style={{
          alignSelf: 'center',
          fontWeight: 'bold',
          color: colors.background,
          marginBottom: 20,
        }}>
        Je créé mon compte
      </Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label="Email"
            placeholder="Saisie ton email"
            theme={{
              colors: {
                primary: colors.background,
                underlineColor: 'transparent',
              },
            }}
            style={{marginBottom: 20}}
          />
        )}
        name="email"
      />
      {errors.firstName && <Text>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            mode="outlined"
            label="Mot de passe"
            placeholder="Saisie ton mot de passe"
            theme={{
              colors: {
                primary: colors.background,
                underlineColor: 'transparent',
              },
            }}
          />
        )}
        name="password"
      />
      <Button
        style={{
          marginTop: 20,
          backgroundColor: colors.light,
          marginHorizontal: 20,
        }}
        labelStyle={{color: colors.background}}
        mode="contained"
        onPress={handleSubmit(onSubmit)}>
        Valider
      </Button>
    </View>
  );
};

export default CreateAccount;
