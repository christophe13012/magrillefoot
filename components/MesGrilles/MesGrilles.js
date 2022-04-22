import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {colors} from '../../utils/colors';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const MesGrilles = ({games, grilles}) => {
  const resultats = [0];
  const navigation = useNavigation();
  return (
    <View style={{marginTop: 35, marginHorizontal: 20}}>
      <Text style={{fontWeight: '500', fontSize: 22, color: colors.white}}>
        Mes grilles
      </Text>
      {games ? (
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: 15,
          }}
          style={{}}>
          {Object.keys(games)
            .sort((a, b) => (games[a].num > games[b].num ? -1 : 1))
            .map(matches => {
              return games[matches].map((m, i) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('MaGrille', {
                      id: matches,
                      game: m,
                    })
                  }
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
                        grilles.matches[matches].result < Date.now()
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
                    Grille #{grilles.matches[matches].num}
                  </Text>
                  <Text style={{color: colors.grey}}>
                    {moment(new Date(grilles.matches[matches].result)).format(
                      'DD/MM',
                    )}
                  </Text>
                  <Text
                    style={{
                      position: 'absolute',
                      right: 3,
                      bottom: 1,
                      fontSize: 12,
                    }}>
                    {i + 1}/3
                  </Text>
                </TouchableOpacity>
              ));
            })}
        </ScrollView>
      ) : (
        <View>
          <Text style={{color: 'white', marginTop: 10}}>
            Aucune grille jouée
          </Text>
        </View>
      )}
    </View>
  );
};
export default MesGrilles;
