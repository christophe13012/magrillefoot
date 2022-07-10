import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {colors} from '../utils/colors';

const Footer = () => {
  return (
    <View>
      <View
        style={{
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <View style={{width: '50%'}}>
          <Text note style={{textAlign: 'center', color: 'white'}}>
            Une question ? Rejoins nous sur nos réseaux
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://twitter.com/magrillefoot')}>
          <Image
            style={{width: 22, height: 22}}
            source={require('../images/twitter.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.instagram.com/bingofoot_officiel/')
          }>
          <Image
            style={{width: 22, height: 22}}
            source={require('../images/instagram.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://discord.gg/4SegrUR')}>
          <Image
            style={{width: 22, height: 22}}
            source={require('../images/discord.png')}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Reglement')}
        style={{
          alignSelf: 'flex-end',
          marginRight: 10,
          marginTop: 10,
          flexDirection: 'row',
        }}>
        <Text note style={{color: 'white'}}>
          Règlement
        </Text>
        <Image
          style={{width: 18, height: 18, marginLeft: 5, marginTop: 1}}
          source={require('../images/info.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
