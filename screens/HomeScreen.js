import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import styling and components
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';


export default function HomeScreen(props) {
  /**
   * Navigate to HelpScreen
   */
  function showHelp() {
    props.navigation.replace('Root', {screen: 'Help'});
  }
  /**
   * Navigate to ViewPeopleScreen
   */
  function showViewPeople() {
    props.navigation.replace('Root', {screen: 'People'});
  }

  return (
    <SafeAreaView style={Styles.safeAreaView}>
        <View style={Styles.homeLogoContainer}>
          <Image source = {require ('../assets/images/roi-logo.jpg')} style = {Styles.homeLogo}/>
        </View>
        <View style={Styles.homeHeadingContainer}>
          <Text style={Styles.homeHeading}>ROI HR Management System</Text>
        </View>
        <View style={Styles.homeBttnContainer}>
          {/* Button to navigate to ViewPeopleScreen */}
          <MyButton
            text="View People"
            type="major"    // default*|major|minor
            size="large"      // small|medium*|large
            buttonStyle={Styles.homeBttn}
            onPress={showViewPeople}
          />
          {/* Button to navigate to HelpScreen */}
          <MyButton
            text="Help"
            type="default"    // default*|major|minor
            size="large"      // small|medium*|large
            buttonStyle={Styles.homeBttn}
            onPress={showHelp}
          />
        </View>
    </SafeAreaView>
  );
}