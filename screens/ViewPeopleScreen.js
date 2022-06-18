import * as React from 'react';
import { View, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { showMessage } from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';

// Import helper code
import { RoiGetPeople } from '../utils/Api';

// Import styling and components
import { TextParagraph, TextH1 } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';


export default function ViewPeopleScreen(props) {
  //State - data for this component
  const [people, setPeople] = React.useState([])

  //Set 'effect' to retieve and store data - only run on mount/unmount (loaded/unloaded)
  //'effectful' code is something the triggers a UI re-render
  React.useEffect(refreshPersonList, [])
  /**
   * Navigate to AddPersonScreen
   */
  function showAddPerson()
  {
    props.navigation.replace('Root', {screen: 'Add'});
  }
  /**
   * Gets People data and passes it to [people, setPeople] state
   */
  async function refreshPersonList()
  {
    displayConnectionMessage()
    if (!(await NetInfo.fetch()).isConnected) {
      return
    }
    
    //Get data from the roi
    RoiGetPeople()
      //success
      .then(data => {
        //storing results in state var
        setPeople(data)
      })
      //error
      .catch(error => {
        showMessage({
          message: `API Error: ${error}`,
          description: "Could not retrive 'people' from server",
          type: 'warning',
          icon: 'auto',
          floating: true,
          duration: 4000,
          position: 'top'
        })
      })
  }
  /**
   * Navigate to ViewPersonScreen and pass through the person's id as a param
   */
  function showViewPerson(person) {
    //Navigate to ViewPerson and pass through the person's id as a param
    props.navigation.navigate('ViewPerson', {personId: person.personId})
  }
  /**
   * Navigate to HomeScreen
   */
  function homeScreen() {
    props.navigation.replace('Root', {screen: 'home'});
  }
  /**
   * loops through all data sets in the people state
   * @returns each person's name, department name, and phone from the people state
   */
  function displayPeople()
  {
    //Flash message when no internet
    displayConnectionMessage()
    
    //Cancel if no 'People' to display
    if (!people)  return
    //loop through the people that are being returned, appropriate output and then return result
    return people.map(p => {
      //create an output view for each item
      return (
        <View key={p.personId} style={Styles.personListItem}>
          <Pressable onPress={() => showViewPerson(p)}>
            <View style={Styles.personListBttn}>
              <View style={Styles.personListItemDetails}>
                <TextParagraph style={Styles.personListItemName}>{p.name}</TextParagraph>
                <TextParagraph style={Styles.personListItemText}>{p.department?.name ?? "---"}</TextParagraph>
                <TextParagraph style={Styles.personListItemText}>Phone: {p.phone}</TextParagraph>
              </View>
            </View>
          </Pressable>
        </View>
      )
    })
  }
  /**
   * Displays flash message if there is no internet connection
   */
  function displayConnectionMessage() {
    //Get network conn status
    NetInfo.fetch()
      .then (
        status => {
          //check if not conn
          if (!status.isConnected) {
            //display flash message (imported from r-n-flash-message)
            showMessage({
              message: 'No internet connection',
              description: 'Any data you view may not be current',
              type: 'warning',
              icon: 'warning',
              floating: true,
              duration: 4000
            })
          }
        }
      )
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
          {/* Button to navigate to AddPersonScreen */}
          <MyButton
            text="Add +"
            type="major"
            size="small"
            onPress={showAddPerson}
          />
          {/* Button to refresh all people data listed */}
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