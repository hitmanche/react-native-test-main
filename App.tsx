/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { AppState, StateProvider } from './src/global/context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Users from './src/modules/users';
import Posts from './src/modules/posts';
import MainStackNavigator from './src/navigation/MainNav';

const Stack = createStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const initialState: AppState = {
    allUsers: [],
  };

  const reducer = (state: AppState, action: any) => {
    switch (action.type) {

      case 'user/add': {
        return {
          ...state,
          allUsers: [...state.allUsers, ...action.users]
        };
      }

      case 'user/delete': {
        const cloneUsers = state.allUsers.slice();
        const userIndex = state.allUsers.indexOf(action.user);
        if (userIndex > -1) {
          cloneUsers.splice(userIndex, 1);
        }
        return {
          ...state,
          allUsers: cloneUsers
        };
      }

      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <MainStackNavigator />
    </StateProvider>
  );
};

export default App;
