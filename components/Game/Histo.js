import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {colors} from '../../utils/colors';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const Histo = ({grilles}) => {
  const navigation = useNavigation();
  return (
    <View style={{marginTop: 15}}>
      <Text style={{color: colors.black}}>Résultats et historique</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: 8,
        }}
        style={{}}>
        {grilles &&
          Object.keys(grilles.matches)
            .sort((a, b) =>
              grilles.matches[a].num > grilles.matches[b].num ? -1 : 1,
            )
            .map((m, i) => {
              console.log('m', m);
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('HistoGrille', {id: m})}
                  key={i}
                  style={{
                    backgroundColor: colors.back,
                    borderRadius: 10,
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 100,
                    marginRight: 15,
                  }}>
                  <View
                    style={{
                      backgroundColor:
                        grilles.matches[m].result < Date.now()
                          ? 'red'
                          : 'green',
                      height: 10,
                      width: 10,
                      borderRadius: 50,
                      position: 'absolute',
                      right: 8,
                      top: 8,
                    }}></View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginTop: 5,
                      color: colors.text,
                    }}>
                    Grille #{grilles.matches[m].num}
                  </Text>
                  <Text style={{color: colors.grey}}>
                    {moment(new Date(grilles.matches[m].result)).format(
                      'DD/MM',
                    )}
                  </Text>
                </TouchableOpacity>
              );
            })}
      </ScrollView>
    </View>
  );
};

export default Histo;
