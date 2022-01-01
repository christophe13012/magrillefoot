import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Ballons from './Ballons';
import Game from './Game/Game';
import Items from './Items';
import MesGrilles from './MesGrilles/MesGrilles';

class Home extends Component {
  state = {link: '', code: '', uniqueId: '', loading: true};
  render() {
    return (
      <ScrollView contentContainerStyle={{}}>
        <View style={{paddingHorizontal: 20}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>Ma grille foot</Text>
        </View>
        <Ballons />
        <Items />
        <Game />
        <MesGrilles />
      </ScrollView>
    );
  }
}

export default Home;
