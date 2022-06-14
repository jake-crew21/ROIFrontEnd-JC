import * as React from 'react';
import { View, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';
import { RoiDeletePerson, RoiGetPeople } from '../utils/Api';
import { PopupOk, PopupOkCancel } from '../utils/Popup';

// Import styling and components
import { TextParagraph, TextH1, TextH3, TextH2 } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';


export default function ViewPeopleScreen(props) {

  //State - data for this component
  const [people, setPeople] = React.useState([])

  //Set 'effect' to retieve and store data - only run on mount/unmount (loaded/unloaded)
  //'effectful' code is something the triggers a UI re-render
  React.useEffect(refreshPersonList, [])

  function showAddPerson()
  {
    props.navigation.replace('Root', {screen: 'home'});
  }

  function refreshPersonList()
  {
    //Get data from the roi
    RoiGetPeople()
      //success
      .then(data => {
        //storing results in state var
        setPeople(data)
      })
      //error
      .catch(error => {
        PopupOk("API Error", "Could not retrive 'people' from server")
      })
  }

  function showViewPerson(person) {
    //Navigate to ViewPerson and pass through the person's id as a param
    props.navigation.navigate('ViewPerson', {personId: person.personId})
  }

  function homeScreen() {
    props.navigation.replace('Root', {screen: 'home'});
  }

  function displayPeople()
  {
    //loop through the people that are being returned, appropriate output and then return result
    return people.map(p => {
      //create an output view for each item
      return (
        <View key={p.personId} style={Styles.personListItem}>
          
          <Pressable onPress={() => showViewPerson(p)}>
            <View style={Styles.personListItemDetails}>
              <TextParagraph style={Styles.personListItemName}>{p.name}</TextParagraph>
              <TextParagraph style={Styles.personListItemText}>{p.department?.name ?? "---"}</TextParagraph>
              <TextParagraph style={Styles.personListItemText}>Phone: {p.phone}</TextParagraph>
            </View>
          </Pressable>
        </View>
      )
    })
  }

  return (
    <SafeAreaView style={Styles.safeAreaView}>
        <View style={Styles.logoAndTitle}>
          <Pressable onPress={homeScreen}>
            <Image source = {require ('../assets/images/roi-logo.jpg')} style = {Styles.logoSize}/>
          </Pressable>
          <TextH1 style={{marginTop:0}}>Staff</TextH1>
        </View>
        <View style = {Styles.peopleButtonContainer}>
          
          <MyButton
            text="Add +"
            type="major"
            size="small"
            
            onPress={showAddPerson}
          />
          <MyButton
            text="Refresh"
            type="minor"
            size="small"
            
            onPress={refreshPersonList}
          />
        </View>


        <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>  

          <View style={Styles.personList}>
            {displayPeople()}
          </View>

      </ScrollView>
    </SafeAreaView>
  );
};