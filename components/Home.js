import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {getTest} from '../Services/http';
import {colors} from '../utils/colors';
import Ballons from './Ballons';
import Game from './Game/Game';
import Items from './Items';
import MesGrilles from './MesGrilles/MesGrilles';

class Home extends Component {
  state = {link: '', code: '', uniqueId: '', loading: true};
  async componentDidMount() {
    console.log('hello 2');
    const test = await getTest();
    console.log('test', test);
  }
  render() {
    console.log('hello');
    return (
      <ScrollView
        contentContainerStyle={{
          backgroundColor: colors.background,
          paddingBottom: 500,
        }}>
        <Ballons />
        <Game />
        <MesGrilles />
      </ScrollView>
    );
  }
}

export default Home;
