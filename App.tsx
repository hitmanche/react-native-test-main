/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";
import { useColorScheme } from "react-native";

import { AppState, StateProvider } from "./src/global/context";
import { createStackNavigator } from "@react-navigation/stack";
import MainStackNavigator from "./src/navigation/MainNav";
import { IUser } from "./src/models/apiModels";

const Stack = createStackNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const initialState: AppState = {
    allUsers: [],
  };

  const reducer = (state: AppState, action: any) => {
    switch (action.type) {
      case "user/add": {
        return {
          ...state,
          allUsers: [...state.allUsers, ...action.users],
        };
      }

      case "user/delete": {
        return {
          ...state,
          allUsers: state.allUsers.filter(
            (user: IUser) => user.id !== action.user.id
          ),
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
