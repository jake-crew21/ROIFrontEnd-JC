import * as React from 'react';
import { View, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';

// Import styling and components
import { TextParagraph, TextH1, TextH2, TextH3, TextListItem } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import Colours from '../constants/Colours';

export default function HelpScreen(props) {

  function homeScreen() {
    props.navigation.replace('Root', {screen: 'home'});
  }

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>

        <View>
          
          <View style={Styles.logoAndTitle}>
            <Pressable onPress={homeScreen}>
              <Image source = {require ('../assets/images/roi-logo.jpg')} style = {Styles.logoSize}/>
            </Pressable>
            <TextH1 style={{marginTop:0}}>Help</TextH1>
          </View>

          <TextH2>Home Buttons</TextH2>

          <TextParagraph>To navigate to the home screen, the home button in the bottom left of the screen at all times. All 'ROI' logos found away from the home screen can also navigate you to the home screen.</TextParagraph>

          <TextH2>View Person</TextH2>

          <TextParagraph>In View People, click/press on person listing to view their profile</TextParagraph>

          <TextH2>Edit/Delete</TextH2>

          <TextParagraph>Edit and Delete can be found on each Person profile. "Edit" can be found near the top left. "Delete" can be found at the bottom of the screen, you may need to scroll depending on your screen size.</TextParagraph>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}