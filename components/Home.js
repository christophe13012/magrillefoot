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
import MesGrilles from './MesGrilles/MesGrilles';
import {connect} from 'react-redux';
import {firebase} from '@react-native-firebase/database';
import {save_items} from '../Store/actions';
import CustomHeader from './CustomHeader';

const mapStateToProps = state => {
  return {
    items: state.items,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    save_items: items => dispatch(save_items(items)),
  };
};

class Home extends Component {
  refItems = null;
  async componentDidMount() {
    this.refItems && this.refItems.off('value', this.listenerItems);
    this.refItems = firebase
      .app()
      .database(
        'https://magrillefoot-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref(`items/${firebase.auth().currentUser.uid}`);

    this.listenerItems = this.refItems.on('value', snap => {
      if (snap) {
        const items = snap.val();
        if (items) {
          this.props.save_items(items);
        }
      }
    });
  }
  render() {
    console.log('items', this.props.items);
    return (
      <ScrollView
        contentContainerStyle={{
          backgroundColor: colors.background,
          paddingBottom: 500,
        }}>
        <CustomHeader />
        <Ballons ballons={this.props.items.bingoballs} />
        <Game />
        <MesGrilles />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
