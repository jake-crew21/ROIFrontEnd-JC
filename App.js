import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from 'react-native-popup-menu';
//import { StyleSheet, Text, View } from 'react-native';

// Import helpers and navigation
import RootNavigator from './navigation/RootNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import FlashMessage from 'react-native-flash-message';


export default function App() {
  return (
    <SafeAreaProvider>
      <MenuProvider>
        <NavigationContainer linking={LinkingConfiguration}>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar style="auto" />
        <FlashMessage/>
      </MenuProvider>
    </SafeAreaProvider>
  );
}

