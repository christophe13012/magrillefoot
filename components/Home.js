import React, {Component} from 'react';
import {ScrollView, SafeAreaView, View, Image, Text} from 'react-native';
import {colors} from '../utils/colors';
import Ballons from './Ballons';
import Game from './Game/Game';
import MesGrilles from './MesGrilles/MesGrilles';
import {connect} from 'react-redux';
import {firebase} from '@react-native-firebase/database';
import {save_grilles, save_items} from '../Store/actions';
import CustomHeader from './CustomHeader';
import BonusStore from './BonusStore';
import messaging from '@react-native-firebase/messaging';
import {
  checkNeedSaveToken,
  saveBattleInfos,
  saveToken,
  updateItems,
} from '../Services/http';
import AppLovinMAX from 'react-native-applovin-max';
import Toast from 'react-native-tiny-toast';
import Footer from './Footer';
import {getTrackingStatus} from 'react-native-tracking-transparency';
import NotifModal from './NotifModal';

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

const REWARDED_AD_UNIT_ID = Platform.select({
  android: '447f6d0e58b89783',
  ios: '8adf505a5a4396f8',
});

class Home extends Component {
  state = {
    visible: false,
    loading: false,
    value: 0,
    animation: false,
    ballon: {value: 0},
    id: 0,
    notifModalVisible: false,
  };
  refItems = null;
  refGrilles = null;
  async componentDidMount() {
    // PUB
    AppLovinMAX.initialize(
      '7uJ-NXPldToWfdoRmeX8NeuLHMkdFQ0CTTJIJzi7tNufVWwXUJixLTVC9VKXvUudD8KV8mW4zh5Wy5Ih6SuFNX',
      configuration => {
        // SDK is initialized, start loading ads
      },
    );
    AppLovinMAX.addEventListener('OnRewardedAdLoadedEvent', () => {
      console.log('pub loaded');
      AppLovinMAX.showRewardedAd(REWARDED_AD_UNIT_ID);
    });
    AppLovinMAX.addEventListener('OnRewardedAdReceivedRewardEvent', () => {
      // Rewarded ad was displayed and user should receive the reward
      this.continueOpen(this.state.ballon, this.state.id);
    });

    AppLovinMAX.addEventListener('OnRewardedAdLoadFailedEvent', () => {
      this.continueOpen(this.state.ballon, this.state.id);
    });
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
        if (grilles) {
          this.props.save_grilles(grilles);
        }
      }
    });

    // NOTIF & TRACK
    const trackingStatus = await getTrackingStatus();
    if (trackingStatus == 'not-determined' || trackingStatus == 'unavailable') {
      this.setState({notifModalVisible: true});
    }
    //await requestTrackingPermission();
  }
  componentWillUnmount() {
    AppLovinMAX.removeEventListener('OnRewardedAdLoadedEvent');
    AppLovinMAX.removeEventListener('OnRewardedAdReceivedRewardEvent');
    AppLovinMAX.removeEventListener('OnRewardedAdLoadFailedEvent');
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
  showRewardAd = () => {
    AppLovinMAX.loadRewardedAd(REWARDED_AD_UNIT_ID);
  };
  open = async (ballon, id) => {
    this.setState({loading: true, value: ballon.value, ballon, id});
    if (ballon.ad) {
      this.showRewardAd();
    } else {
      setTimeout(() => {
        this.continueOpen(ballon, id);
      }, 1000);
    }
  };
  continueOpen = async (ballon, id) => {
    this.setState({animation: true});
    Toast.show(
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 16}}>
          Bravo, tu gagnes {ballon.value} 💎
        </Text>
        <Text style={{color: 'white', fontSize: 16}}>!!</Text>
      </View>,
      {
        position: 70,
        containerStyle: {backgroundColor: colors.warning, width: '90%'},
        textStyle: {color: 'white'},
        duration: 4000,
      },
    );
    await updateItems(ballon, id);
    this.setState({loading: false});
  };
  render() {
    return (
      <SafeAreaView>
        <CustomHeader onStore={() => this.setState({visible: true})} />
        {this.props.grilles && this.props.grilles.matches && (
          <ScrollView
            contentContainerStyle={{
              backgroundColor: colors.background,
              paddingBottom: 100,
            }}
            style={{backgroundColor: colors.light}}>
            <Ballons
              ballons={this.props.items.bingoballs}
              loading={this.state.loading}
              animation={this.state.animation}
              value={this.state.value}
              open={this.open}
              disableAnimation={() => this.setState({animation: false})}
            />
            <Game grilles={this.props.grilles} items={this.props.items} />
            <MesGrilles
              grilles={this.props.grilles}
              games={this.props.items.games}
            />
            <Footer />
            <BonusStore
              visible={this.state.visible}
              setVisible={val => this.setState({visible: val})}
              inGame={0}
            />
            <NotifModal
              requestUserPermission={this.requestUserPermission}
              visible={this.state.notifModalVisible}
              setVisible={val => this.setState({notifModalVisible: val})}
            />
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
