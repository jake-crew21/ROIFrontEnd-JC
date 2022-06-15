import * as React from 'react';
import { View, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import { RoiDeletePerson, RoiGetPerson } from '../utils/Api';
import { PopupOk, PopupOkCancel } from '../utils/Popup';

// Import styling and components
import { TextParagraph, TextH1, TextLabel } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';


export default function ViewPersonScreen(props) {

  //default person obj
  const personTemp = {
    personId: null,
    name: "",
    phone: "",
    departmentId: null,
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    departmenmt: null,
  }

  //State - data for this component
  const [person, setPerson] = React.useState(personTemp)

  //Set 'effect' to retieve and store data - only run on mount/unmount (loaded/unloaded)
  //'effectful' code is something the triggers a UI re-render
  React.useEffect(refreshPerson, [])
  /**
   * Navigate to EditPersonScreen and pass through the person's id as a param
   */
  function showEditPerson()
  {
    props.navigation.navigate('EditPerson', {personId: person.personId})
  }
  /**
   * Navigate to ViewPeopleScreen
   */
  function showViewPeople()
  {
    props.navigation.replace("Root", {screen: "People"})
  }
  /**
   * Gets the Person data by refering to the personId from the previous screen
   */
  function refreshPerson()
  {
    //GET the personId passed to this screen (via props)
    const personId = props.route.params.personId

    //testing 
    console.log("load person: " + personId)
    //Get data from the api
    RoiGetPerson(personId)
      //success
      .then(data => {
        //storing results in state var (if data is returned)
        if (data) setPerson(data)
      })
      //error
      .catch(error => {
        PopupOk("API Error", "Could not retrive person from server")
        props.navigation.navigate("ViewPeople")
      })
  }
  /**
   * Navigate to HomeScreen
   */
  function homeScreen() {
    props.navigation.replace('Root', {screen: 'home'});
  }
  /**
   * Deletes person selected by personId from the data previously gotten from the API
   * after confirming with user
   */
  function deletePerson() {
    //check if person should be deleted (confirm with user)
    PopupOkCancel(
      //Tittle
      "Delete Person?",
      //message
      `Are you sure you want to delete ${person.name}?`,
      //OK - delete the person
      () => {
        //Delete the person using the API
        RoiDeletePerson(person.personId)
          .then (data => {
          //show confirmation that person has been deleted
          PopupOk("Person Deleted", `${person.name} has been deleted.`)
          //Refresh the person list
          showViewPeople()
          })
          .catch (error => {
            //display error to user
            PopupOk("Error", error)
          })
          
      },
      //Cancel - do nothing
      () => {console.log("Canceled")}
    )
  }
  //Main output
  return (
    <SafeAreaView style={Styles.safeAreaView}>
        <View style={Styles.logoAndTitle}>
          <Pressable onPress={homeScreen}>
            <Image source = {require ('../assets/images/roi-logo.jpg')} style = {Styles.logoSize}/>
          </Pressable>
          <TextH1 style={{marginTop:0}}>{person.name}</TextH1>
        </View>
        <View style = {Styles.peopleButtonContainer}>
          {/* Button to navigate to EditScreen */}
          <MyButton
            text="Edit"
            type="major"
            size="medium"
            onPress={showEditPerson}
            />
            {/* Button to refresh ViewPerson */}
          <MyButton
            text="Refresh"
            type="default"
            size="Medium"
            onPress={refreshPerson}
            />
        </View>

        <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>  
          {/* ViewPerson data gotten from the API */}
          <View style={Styles.form}>
            {/* Details */}
            <View style={Styles.fieldSet}>
              <TextParagraph style={Styles.legend}>Details</TextParagraph>
              <View style={Styles.formRow}>
                <TextLabel>ID:</TextLabel>
                <TextParagraph>{person.personId}</TextParagraph>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>Phone:</TextLabel>
                <TextParagraph>{person.phone}</TextParagraph>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>Department:</TextLabel>
                <TextParagraph>{person.department?.name ?? "---"}</TextParagraph>
              </View>
            </View>
            {/* Address */}
            <View style={Styles.fieldSet}>
              <TextParagraph style={Styles.legend}>Address</TextParagraph>
              <View style={Styles.formRow}>
                <TextLabel>City:</TextLabel>
                <TextParagraph>{person.city}</TextParagraph>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>State:</TextLabel>
                <TextParagraph>{person.state}</TextParagraph>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>Zip:</TextLabel>
                <TextParagraph>{person.zip}</TextParagraph>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>Country:</TextLabel>
                <TextParagraph>{person.country}</TextParagraph>
              </View>
            </View>
            {/* Delete Button */}
          </View>
          <View>
            <MyButton
            text="Delete"
            type="default"
            size="small"
            buttonText={Styles.personListItembttnText}
            onPress={deletePerson}
            />
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};