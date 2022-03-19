import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {colors} from '../../utils/colors';

const MesGrilles = () => {
  return (
    <View style={{marginTop: 35, marginHorizontal: 20}}>
      <Text style={{fontWeight: '500', fontSize: 22, color: colors.white}}>
        Mes grilles
      </Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: 15,
        }}
        style={{}}>
        {resultats.map((x, i) => {
          return (
            <View
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
              {i == 0 && (
                <View
                  style={{
                    backgroundColor: 'red',
                    height: 10,
                    width: 10,
                    borderRadius: 50,
                    position: 'absolute',
                    right: 8,
                    top: 8,
                  }}></View>
              )}
              <Text
                style={{fontWeight: 'bold', marginTop: 5, color: colors.text}}>
                Grille #22
              </Text>
              <Text style={{color: colors.grey}}>22 Aout</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default MesGrilles;
