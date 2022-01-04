import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {colors} from '../utils/colors';
import Ballons from './Ballons';
import Game from './Game/Game';
import Items from './Items';
import MesGrilles from './MesGrilles/MesGrilles';

class Home extends Component {
  state = {link: '', code: '', uniqueId: '', loading: true};
  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          backgroundColor: colors.background,
          paddingBottom: 500,
        }}>
        <View style={{paddingHorizontal: 20}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>Ma grille foot</Text>
        </View>
        <Ballons />
        <Game />
        <MesGrilles />
      </ScrollView>
    );
  }
}

export default Home;
