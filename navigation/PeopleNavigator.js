import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

// Import navigation and screens
import ViewPeopleScreen from '../screens/ViewPeopleScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

export default function PeopleNavigator() {
  return (
    <Stack.Navigator initialRouteName='ViewPeople' screenOptions={{ headerShown: false }}>
      
      <Stack.Screen 
          name="ViewPeople" 
          component={ViewPeopleScreen} 
          options={{ title: 'View All People' }} 
      />
    </Stack.Navigator>
  );
}