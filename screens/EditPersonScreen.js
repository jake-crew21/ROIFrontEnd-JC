import * as React from 'react';
import { View, ScrollView, Image, Pressable, TextInput, Picker } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {showMessage} from "react-native-flash-message";
import NetInfo from '@react-native-community/netinfo';

// Import helper code
import Settings from '../constants/Settings';
import { RoiDeletePerson, RoiGetDepartments, RoiGetPeople, RoiGetPerson, RoiUpdatePerson } from '../utils/Api';
import { PopupOk, PopupOkCancel } from '../utils/Popup';

// Import styling and components
import { TextParagraph, TextH1, TextH3, TextH2, TextLabel } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';


export default function EditPersonScreen(props) {

  //State - data for this component
  const [personId, setPersonId] = React.useState(-1)
  const [name, setName] = React.useState("")
  const [nameOg, setNameOg] = React.useState("")
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
  React.useEffect(refreshPerson, [])
  /**
   * Gets Departments data and passes it to [departments, setDepartments] state
   */
  async function refreshDepartments()
  {
    displayConnectionMessage()
    if (!(await NetInfo.fetch()).isConnected) {
      return
    }
    //Get data from the roi
    RoiGetDepartments()
      //success
      .then(data => {
        //storing results in state var
        setDepartments(data)
      })
      //error
      .catch(error => {
        showMessage({
          message: `API Error: ${error}`,
          description: "Could not retrive 'departments' from server",
          type: 'warning',
          icon: 'auto',
          floating: true,
          duration: 4000,
          position: 'top',
          autoHide: false,
          onPress: showViewPeople()
        })
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
   * Gets the Person data by refering to the personId from the previous screen
   */
  function refreshPerson()
  {
    //GET the personId passed to this screen (via props)
    const personId = props.route.params.personId

    //Get data from the api
    RoiGetPerson(personId)
      //success
      .then(p => {
        //storing results in state var (if data is returned)
        if (p) {
          setPersonId(p.personId)
          setName(p.name)
          setNameOg(p.name)
          setPhone(p.phone)
          setDepartmentId(p.departmentId ?? 0)
          setStreet(p.street)
          setCity(p.city)
          setState(p.state)
          setZip(p.zip)
          setCountry(p.country)
        }
      })
      //error
      .catch(error => {
        showMessage({
          message: `API Error: ${error}`,
          description: "Could not retrive 'person' from server",
          type: 'warning',
          icon: 'auto',
          floating: true,
          duration: 4000,
          position: 'top',
          autoHide: false,
          onPress: showViewPeople()
        })
      })
  }
  /**
   * Navigate to HomeScreen
   */
  function homeScreen() {
    props.navigation.replace('Root', {screen: 'home'});
  }
  /**
   * Navigate to ViePerson and pass through the person's id as a param
   */
  function showViewPerson() {
    props.navigation.navigate('ViewPerson', {personId: personId})
  }
  /**
   * Updates the person data with the personId as verification
   */
  function savePerson() {
    
    RoiUpdatePerson(personId, name, phone, departmentId, street, city, state, zip, country)
      .then(data => {
        showViewPeople()
      })
      .catch(error => {
        showMessage({
          message: `API Error: ${error}`,
          description: "No edits can be saved while offline,\ntry again when you are connected to the internet",
          type: 'danger',
          icon: 'auto',
          floating: true,
          duration: 4000,
          position: 'top',
          autoHide: false,
          onPress: showViewPeople()
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
              description: 'No edits can be saved,\nuntil you have an active internet connection',
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
          <TextH1 style={{marginTop:0}}>{nameOg}</TextH1>
        </View>

        <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>  
          {/* Display editable fields, populated with the current values for each field */}
          <View style={Styles.form}>
            {/* Details */}
            <View style={Styles.fieldSet}>
              <TextParagraph style={Styles.legend}>Details</TextParagraph>
              <View style={Styles.formRow}>
                <TextLabel>ID:</TextLabel>
                <TextParagraph>{personId}</TextParagraph>
              </View>
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
              onPress={savePerson}
              />
              <MyButton
              text="Cancel"
              type="default"
              size="medium"
              buttonText={Styles.personListItembttnText}
              onPress={showViewPerson}
              />
            </View>
          </View>

      </ScrollView>
    </SafeAreaView>
  );
};