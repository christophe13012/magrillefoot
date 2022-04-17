import React, {useState, useEffect} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import Home from './components/Home';
import {colors} from './utils/colors';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Welcome from './components/Welcome';
import Profil from './components/Game/Profil/Profil';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {rootReducer} from './Store/reducer';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider as PaperProvider} from 'react-native-paper';
import CustomHeader from './components/CustomHeader';
import Jouer from './components/Game/Jouer';
import {Root} from 'native-base';
import Teams from './components/Teams';
import Team from './components/Team';
import MaGrille from './components/MaGrille';
import HistoGrille from './components/HistoGrille';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = createStore(persistedReducer);
let persistor = persistStore(store);

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="Jouer"
        component={Jouer}
        //options={{presentation: 'fullScreenModal'}}
      />
      <HomeStack.Screen
        name="HistoGrille"
        component={HistoGrille}
        //options={{presentation: 'fullScreenModal'}}
      />
      <HomeStack.Screen
        name="MaGrille"
        component={MaGrille}
        //options={{presentation: 'fullScreenModal'}}
      />
    </HomeStack.Navigator>
  );
}

function TeamsStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Amis" component={Teams} />
      <HomeStack.Screen
        name="Team"
        component={Team}
        //options={{presentation: 'fullScreenModal'}}
      />
    </HomeStack.Navigator>
  );
}

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const isDarkMode = useColorScheme() === 'dark';

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <PaperProvider>
      <SafeAreaView style={{backgroundColor: colors.background, flex: 1}}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {!user ? (
              <Welcome />
            ) : (
              <Root>
                <NavigationContainer>
                  <Tab.Navigator
                    screenOptions={{
                      tabBarStyle: {backgroundColor: colors.background},
                      headerShown: false,
                    }}>
                    <Tab.Screen
                      name="Homescreen"
                      component={HomeStackScreen}
                      options={{
                        tabBarLabel: 'Jouer',
                        tabBarLabelStyle: {color: colors.white},
                        tabBarIcon: ({color, size}) => (
                          <MaterialCommunityIcons
                            name="home"
                            color={colors.white}
                            size={size}
                          />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Teams"
                      component={TeamsStackScreen}
                      options={{
                        tabBarLabel: 'Amis',
                        tabBarLabelStyle: {color: colors.white},
                        tabBarIcon: ({color, size}) => (
                          <MaterialCommunityIcons
                            name="podium"
                            color={colors.white}
                            size={size}
                          />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Profil"
                      component={Profil}
                      options={{
                        tabBarLabel: 'Profil',
                        tabBarLabelStyle: {color: colors.white},
                        tabBarIcon: ({color, size}) => (
                          <MaterialCommunityIcons
                            name="account"
                            color={colors.white}
                            size={size}
                          />
                        ),
                      }}
                    />
                  </Tab.Navigator>
                </NavigationContainer>
              </Root>
            )}
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </PaperProvider>
  );
}
