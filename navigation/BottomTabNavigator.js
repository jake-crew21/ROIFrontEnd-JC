import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

// Import styling and components
import TabBarIcon from '../components/TabBarIcon';
import Colours from "../constants/Colours";
import Styles from "../styles/MainStyle";

// Import navigators & screens
import HomeScreen from '../screens/HomeScreen';
import HelpScreen from '../screens/HelpScreen';
import PeopleNavigator from './PeopleNavigator';
import AddPersonScreen from '../screens/AddPersonScreen';


const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colours.tabLabelSelected,
        tabBarInactiveTintColor: Colours.tabLabel,
        tabBarStyle: Styles.navBar,
        tabBarLabelStyle: Styles.navBarLabel,
      }}
    >
      {/* HomeScreen Navi */}
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />
        }}
      />
      {/* People Navi for ViewPeople, ViewPerson and EditPerson */}
      <BottomTab.Screen
        name="People"
        component={PeopleNavigator}
        options={{
          title: 'View People',
          unmountOnBlur: true, //reset screen when navigated away from
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-people" />
        }}
      />
      {/* AddPersonScreen Navi */}
      <BottomTab.Screen
        name="Add"
        component={AddPersonScreen}
        options={{
          title: 'AddPerson',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add" />
        }}
      />
      {/* HelpScreen Navi */}
      <BottomTab.Screen
        name="Help"
        component={HelpScreen}
        options={{
          title: 'Help',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-help-circle" />,
        }}
      />
    </BottomTab.Navigator>
  );
}