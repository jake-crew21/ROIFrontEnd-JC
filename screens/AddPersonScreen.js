import * as React from 'react';
import { View, ScrollView, Image, Pressable, TextInput, Picker } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { showMessage } from "react-native-flash-message";
import NetInfo from '@react-native-community/netinfo';

// Import helper code
import { RoiAddPerson, RoiGetDepartments } from '../utils/Api';
import { PopupOk } from '../utils/Popup';

// Import styling and components
import { TextParagraph, TextH1, TextLabel } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';
import status from 'webpack-dev-server/lib/utils/status';

export default function AddPersonScreen(props) {

  //State - data for this component
  const [name, setName] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [departmentId, setDepartmentId] = React.useState(0)
  const [street, setStreet] = React.useState("")
  const [city, setCity] = React.useState("")
  const [state, setState] = React.useState("")
  const [zip, setZip] = React.useState("")
  const [country, setCountry] = React.useState("")
  //State - date for department picker
  const [departments, setDepartments] = React.useState([])
  
  //Set 'effect' to retieve and store data - only run on mount/unmount (loaded/unloaded)
  //'effectful' code is something the triggers a UI re-render
  React.useEffect(refreshDepartments, [])
  /**
   * Gets Departments data and passes it to [departments, setDepartments] state
   */
  function refreshDepartments()
  {
    //Get data from the roi
    RoiGetDepartments()
      //success
      .then(data => {
        //storing results in state var
        setDepartments(data)
      })
      //error
      .catch(error => {
        PopupOk("API Error", "Could not retrive 'departments' from server")
      })
  }
  /**
   * Navigate to ViewPeopleScreen
   */
  function showViewPeople()
  {
    props.navigation.replace("Root", {screen: "People"})
  }
  /**
   * Navigate to HomeScreen
   */
  function homeScreen() {
    props.navigation.replace('Root', {screen: 'home'});
  }
  /**
   * Adds new person to the People Table
   */
  async function addPerson() {
    //check internet connection, if no connection inform user
    displayConnectionMessage()
    //stop function from trying to connect to API if no internet connection
    if (!(await NetInfo.fetch()).isConnected) {
      return
    }
    
    RoiAddPerson(name, phone, departmentId, street, city, state, zip, country)
      .then(data => {
        showViewPeople()
      })
      .catch(error => {
        showMessage({
          message: 'No internet connection',
          description: 'No new people can be added,\nuntil you have an active internet connection',
          type: 'danger',
          icon: 'auto',
          floating: true,
          duration: '4000',
          autoHide: false
        })
      })
      
  }
  /**
   * loops through all departments 
   * @returns each department name as a picker item
   */
  function displayDepartment() {
    return departments.map(d =>{
      return (
        <Picker.Item key={d.departmentId} label={d.name} value={d.departmentId}/>
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
              description: 'No new people can be added,\nuntil you have an active internet connection',
              type: 'danger',
              icon: 'auto',
              floating: true,
              duration: '4000',
              autoHide: false
            })
          }
        }
      )
  }
  //Main output
  return (
    <SafeAreaView style={Styles.safeAreaView}>
        <View style={Styles.logoAndTitle}>
          <Pressable onPress={homeScreen}>
            <Image source = {require ('../assets/images/roi-logo.jpg')} style = {Styles.logoSize}/>
          </Pressable>
          <TextH1 style={{marginTop:0}}>New Staff</TextH1>
        </View>

        <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>  
          {/* Display editable fields */}
          <View style={Styles.form}>
            {/* Details */}
            <View style={Styles.fieldSet}>
              <TextParagraph style={Styles.legend}>Details</TextParagraph>
              <View style={Styles.formRow}>
                <TextLabel>name:</TextLabel>
                <TextInput value={name} onChangeText={setName} style={Styles.textInput}></TextInput>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>Phone:</TextLabel>
                <TextInput value={phone} onChangeText={setPhone} style={Styles.textInput}></TextInput>         
              </View>
              <View style={Styles.formRow}>
                <TextLabel>Department:</TextLabel>
                <Picker
                  selectedValue={departmentId}
                  onValueChange={setDepartmentId}
                  style = {Styles.picker}
                  itemstyle={Styles.pickerItem}
                >
                  {displayDepartment()}
                </Picker>
              </View>
            </View>
            {/* Address */}
            <View style={Styles.fieldSet}>
              <TextParagraph style={Styles.legend}>Address</TextParagraph>
              <View style={Styles.formRow}>
                <TextLabel>Street:</TextLabel>
                <TextInput value={street} onChangeText={setStreet} style={Styles.textInput}></TextInput>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>City:</TextLabel>
                <TextInput value={city} onChangeText={setCity} style={Styles.textInput}></TextInput>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>State:</TextLabel>
                <TextInput value={state}  onChangeText={setState} style={Styles.textInput}></TextInput>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>Zip:</TextLabel>
                <TextInput value={zip} onChangeText={setZip} style={Styles.textInput}></TextInput>
              </View>
              <View style={Styles.formRow}>
                <TextLabel>Country:</TextLabel>
                <TextInput value={country}  onChangeText={setCountry} style={Styles.textInput}></TextInput>
              </View>
            </View>
            {/* Save & Cancel Button */}
            <View style={Styles.peopleButtonContainer}>
              <MyButton
              text="Save"
              type="major"
              size="medium"
              buttonText={Styles.personListItembttnText}
              onPress={addPerson}
              />
              <MyButton
              text="Cancel"
              type="default"
              size="medium"
              buttonText={Styles.personListItembttnText}
              onPress={showViewPeople}
              />
            </View>
          </View>

      </ScrollView>
    </SafeAreaView>
  );
};