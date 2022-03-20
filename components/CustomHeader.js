import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {colors} from '../utils/colors';
import {useSelector} from 'react-redux';

const CustomHeader = ({ballons}) => {
  const items = useSelector(state => state.items);
  return (
    <View
      style={{
        backgroundColor: colors.background,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingBottom: 20,
      }}>
      <View>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '900',
            color: colors.light,
          }}>
          Ma Grille Foot
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginRight: 3,
              color: colors.white,
            }}>
            {items.coins}
          </Text>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={require('../images/coin.png')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: colors.light,
              alignItems: 'center',
              justifyContent: 'center',
              height: 25,
              width: 25,
              borderRadius: 5,
              marginRight: 5,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 2}}>
              +
            </Text>
          </View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginRight: 3,
              color: colors.white,
              marginLeft: 3,
            }}>
            {items.shield}
          </Text>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={require('../images/glove.png')}
          />
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;
