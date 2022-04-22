import React, {Component} from 'react';
import {ScrollView, SafeAreaView, LogBox} from 'react-native';
import {colors} from '../utils/colors';
import Ballons from './Ballons';
import Game from './Game/Game';
import MesGrilles from './MesGrilles/MesGrilles';
import {connect} from 'react-redux';
import {firebase} from '@react-native-firebase/database';
import {save_grilles, save_items} from '../Store/actions';
import CustomHeader from './CustomHeader';
import BonusStore from './BonusStore';
import LottieView from 'lottie-react-native';
import messaging from '@react-native-firebase/messaging';
import {checkNeedSaveToken, saveToken} from '../Services/http';

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
    this.requestUserPermission();
    console.log('uid', firebase.auth().currentUser.uid);
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
        console.log('grilletest', grilles);
        if (grilles) {
          this.props.save_grilles(grilles);
        }
      }
    });
  }
  getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      return fcmToken;
    } else {
      console.log('Failed', 'No token received');
    }
  };
  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      let token = await this.getFcmToken();
      const needSaveToken = await checkNeedSaveToken(token);
      if (needSaveToken) {
        await saveToken(token);
      }
    }
  };
  render() {
    return (
      <SafeAreaView>
        <CustomHeader onStore={() => this.setState({visible: true})} />
        <ScrollView
          contentContainerStyle={{
            backgroundColor: colors.background,
            paddingBottom: 500,
          }}>
          <Ballons ballons={this.props.items.bingoballs} />
          <Game grilles={this.props.grilles} items={this.props.items} />
          <MesGrilles
            grilles={this.props.grilles}
            games={this.props.items.games}
          />
          <BonusStore
            visible={this.state.visible}
            setVisible={val => this.setState({visible: val})}
            inGame={0}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
