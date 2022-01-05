import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Home from './components/Home';
import {colors} from './utils/colors';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function CustomHeader() {
  return (
    <View
      style={{
        backgroundColor: colors.background,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingBottom: 20,
      }}>
      <View>
        <Text style={{fontSize: 20}}>Salut Chris 👋</Text>
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
          <Text style={{fontSize: 20, fontWeight: 'bold', marginRight: 3}}>
            0
          </Text>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={require('./images/coin.png')}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: colors.backBack,
              alignItems: 'center',
              justifyContent: 'center',
              height: 25,
              width: 25,
              borderRadius: 5,
              marginRight: 5,
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 2}}>
              +
            </Text>
          </View>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginRight: 3}}>
            0
          </Text>
          <Image
            style={{
              width: 30,
              height: 30,
            }}
            source={require('./images/shield.png')}
          />
        </View>
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={{backgroundColor: colors.background, flex: 1}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {backgroundColor: colors.background},
          }}>
          <Tab.Screen
            name="Jouer"
            component={Home}
            options={{
              tabBarLabel: 'Home',
              header: props => <CustomHeader {...props} />,
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Team"
            component={Home}
            options={{
              tabBarLabel: 'Teams',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="podium"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profil"
            component={Home}
            options={{
              tabBarLabel: 'Profil',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
