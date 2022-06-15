import * as React from 'react';
import { View, ScrollView, Image, Pressable, TextInput, Picker } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';
import { RoiAddPerson, RoiDeletePerson, RoiGetDepartments, RoiGetPeople, RoiGetPerson, RoiUpdatePerson } from '../utils/Api';
import { PopupOk, PopupOkCancel } from '../utils/Popup';

// Import styling and components
import { TextParagraph, TextH1, TextH3, TextH2, TextLabel } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';


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

  const [departments, setDepartments] = React.useState([])
  
  //Set 'effect' to retieve and store data - only run on mount/unmount (loaded/unloaded)
  //'effectful' code is something the triggers a UI re-render
  React.useEffect(refreshDepartments, [])

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

  function showViewPeople()
  {
    props.navigation.replace("Root", {screen: "People"})
  }
  

  function homeScreen() {
    props.navigation.replace('Root', {screen: 'home'});
  }

  function addPerson() {
    RoiAddPerson(name, phone, departmentId, street, city, state, zip, country)
      .then(data => {
        console.log(data)
        showViewPeople()
      })
      .catch(error => {
        PopupOk("Error", error)
      })
      
  }

  function displayDepartment() {
    return departments.map(d =>{
      return (
        <Picker.Item key={d.departmentId} label={d.name} value={d.departmentId}/>
      )
    })
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
                {/* <TextInput value={departmentId} onChangeText={setDepartmentId} style={Styles.textInput}></TextInput> */}
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