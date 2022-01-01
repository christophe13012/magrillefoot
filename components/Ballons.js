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

class Ballons extends Component {
  state = {link: '', code: '', uniqueId: '', loading: true};
  ballons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginTop: 20,
          paddingHorizontal: 15,
        }}>
        <Text style={{fontWeight: '500', fontSize: 22, marginBottom: 10}}>
          Récupère un max de pièces
        </Text>
        <View style={{backgroundColor: colors.back, borderRadius: 15}}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              backgroundColor: colors.back,
              height: 100,
              alignItems: 'center',
              paddingHorizontal: 15,
              borderRadius: 15,
            }}
            style={{borderRadius: 15}}>
            {this.ballons.map((x, i) => {
              return (
                <TouchableOpacity key={i} style={{marginRight: 8}}>
                  <Image
                    style={{
                      width: 55,
                      height: 55,
                      marginRight: 10,
                    }}
                    source={require('../images/baby.png')}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Ballons;
