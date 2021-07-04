import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Posts from '../modules/posts';
import Users from '../modules/users';
import { Text, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Posts"
          component={Posts}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Users')}
                style={{ marginRight: 20 }}>
                <Text style={{ color: 'red' }}>Go to Users</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Users" component={Users} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
