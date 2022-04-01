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
import {save_grilles, save_items} from '../Store/actions';
import CustomHeader from './CustomHeader';
import {Toast} from 'native-base';
import BonusStore from './BonusStore';

const mapStateToProps = state => {
  return {
    items: state.items,
    grilles: state.grilles,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    save_items: items => dispatch(save_items(items)),
    save_grilles: grilles => dispatch(save_grilles(grilles)),
  };
};

class Home extends Component {
  state = {visible: false};
  refItems = null;
  refGrilles = null;
  async componentDidMount() {
    // ITEMS
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

    // GRILLES
    this.refGrilles && this.refGrilles.off('value', this.listenerGrilles);
    this.refGrilles = firebase
      .app()
      .database(
        'https://magrillefoot-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref(`grilles`);

    this.refGrilles = this.refGrilles.on('value', snap => {
      if (snap) {
        const grilles = snap.val();
        console.log('grille', grilles);
        if (grilles) {
          this.props.save_grilles(grilles);
        }
      }
    });
  }
  render() {
    return (
      <View>
        <CustomHeader onStore={() => this.setState({visible: true})} />
        <ScrollView
          contentContainerStyle={{
            backgroundColor: colors.background,
            paddingBottom: 500,
          }}>
          <Ballons ballons={this.props.items.bingoballs} />
          <Game grilles={this.props.grilles} />
          <MesGrilles />
          <BonusStore
            visible={this.state.visible}
            setVisible={val => this.setState({visible: val})}
            inGame={0}
          />
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
