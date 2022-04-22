import React, {Component} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {colors} from '../utils/colors';
import {useSelector} from 'react-redux';

const CustomHeader = ({ballons, onStore}) => {
  const items = useSelector(state => state.items);
  return (
    <View
      style={{
        backgroundColor: colors.background,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingBottom: 20,
        paddingTop: 10,
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
              marginRight: 5,
              color: colors.white,
            }}>
            {items.coins}
          </Text>
          <Image
            style={{
              width: 25,
              height: 25,
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
          <TouchableOpacity
            onPress={onStore}
            style={{
              backgroundColor: colors.light,
              alignItems: 'center',
              justifyContent: 'center',
              height: 20,
              width: 20,
              borderRadius: 5,
              marginRight: 5,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 2}}>
              +
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginRight: 3,
              color: colors.white,
              marginLeft: 3,
            }}>
            {items.bonus}
          </Text>
          <Text
            style={{
              fontSize: 22,
              marginLeft: 1,
            }}>
            🍀
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;
