import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

// Import navigation and screens
import ViewPeopleScreen from '../screens/ViewPeopleScreen';
import ViewPersonScreen from '../screens/ViewPersonScreen';
import EditPersonScreen from '../screens/EditPersonScreen';

import Styles from "../styles/MainStyle";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

export default function PeopleNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName='ViewPeople' 
      screenOptions={{ 
        headerShown: true,
        headerBackTitle: "Back",
        headerStyle: Styles.headerBar,
        headerTitleStyle: Styles.headerBarTitle 
      }}>
      {/* ViewPeopleScreen Navi */}
      <Stack.Screen 
          name="ViewPeople" 
          component={ViewPeopleScreen} 
          options={{ title: 'View All People' }} 
      />
      {/* ViewPersonScreen Navi */}
      <Stack.Screen 
          name="ViewPerson" 
          component={ViewPersonScreen} 
          options={{ title: 'View Person' }} 
      />
      {/* EditPersonScreen Navi */}
      <Stack.Screen 
          name="EditPerson" 
          component={EditPersonScreen} 
          options={{ title: 'Edit Person' }} 
      />
    </Stack.Navigator>
  );
}