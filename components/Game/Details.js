import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {colors} from '../../utils/colors';
import moment from 'moment';
import {Badge} from 'react-native-paper';

const Details = ({grilles}) => {
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          borderRadius: 50,
          backgroundColor: 'red',
          paddingHorizontal: 4,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
        }}>
        <Text style={{color: 'white'}}>
          #{grilles && grilles?.matches[grilles.details.actual].num}
        </Text>
      </View>
      <View>
        <Text style={{color: colors.black}}>Grille en cours</Text>
        <Text style={{color: colors.black}}>
          à valider avant le{' '}
          {moment(new Date(grilles.details.limit)).format('DD/MM à H:mm')}
        </Text>
      </View>
    </View>
  );
};

export default Details;
