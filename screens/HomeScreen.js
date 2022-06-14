import * as React from 'react';
import { Image, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';

// Import styling and components
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';
import { TextH1, TextH2, TextParagraph } from "../components/StyledText";


export default function HomeScreen(props) {

  function showHelp() {
    props.navigation.replace('Root', {screen: 'Help'});
  }
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
          <MyButton
            text="View People"
            type="major"    // default*|major|minor
            size="large"      // small|medium*|large
            buttonStyle={Styles.homeBttn}
            onPress={showViewPeople}
          />
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