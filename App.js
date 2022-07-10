import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import Home from './components/Home';
import {colors} from './utils/colors';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Welcome from './components/Welcome';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {rootReducer} from './Store/reducer';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider as PaperProvider} from 'react-native-paper';
import Jouer from './components/Game/Jouer';
import {Root} from 'native-base';
import Teams from './components/Teams';
import Team from './components/Team';
import MaGrille from './components/MaGrille';
import HistoGrille from './components/HistoGrille';
import {red100} from 'react-native-paper/lib/typescript/styles/colors';

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
    SplashScreen.hide();
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
                        tabBarActiveTintColor: colors.light,
                        tabBarLabel: ({focused}) => (
                          <Text
                            style={{
                              color: focused ? colors.light : '#fff',
                              fontSize: 11,
                              marginTop: -5,
                            }}>
                            Jouer
                          </Text>
                        ),
                        tabBarIcon: ({color, size, focused}) => (
                          <MaterialCommunityIcons
                            name="home"
                            size={30}
                            color={focused ? colors.light : '#fff'}
                          />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Teams"
                      component={TeamsStackScreen}
                      options={{
                        tabBarLabel: 'Amis',
                        tabBarLabel: ({focused}) => (
                          <Text
                            style={{
                              color: focused ? colors.light : '#fff',
                              fontSize: 11,
                            }}>
                            Amis
                          </Text>
                        ),
                        tabBarIcon: ({color, size, focused}) => (
                          <MaterialCommunityIcons
                            name="podium"
                            color={focused ? colors.light : '#fff'}
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
