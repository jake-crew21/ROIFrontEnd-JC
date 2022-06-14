import * as React from 'react';
import { View, ScrollView, Image, Pressable, TextInput, Picker } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';
import { RoiDeletePerson, RoiGetPeople, RoiGetPerson } from '../utils/Api';
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
  
  //Set 'effect' to retieve and store data - only run on mount/unmount (loaded/unloaded)
  //'effectful' code is something the triggers a UI re-render
  React.useEffect(refreshPerson, [])

  function showViewPeople()
  {
    props.navigation.replace("Root", {screen: "People"})
  }
  
  function refreshPerson()
  {
    //GET the personId passed to this screen (via props)
    const personId = props.route.params.personId

    //testing 
    console.log("load person: " + personId)
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
          setDepartmentId(p.departmentId)
          setStreet(p.street)
          setCity(p.city)
          setState(p.state)
          setZip(p.zip)
          setCountry(p.country)
        }
      })
      //error
      .catch(error => {
        // PopupOk("API Error", "Could not retrive person from server")
        showViewPeople()
      })
  }

  function homeScreen() {
    props.navigation.replace('Root', {screen: 'home'});
  }

  function showViewPerson() {
    //Navigate to ViePerson and pass through the person's id as a param
    props.navigation.navigate('ViewPerson', {personId: personId})
  }

  function savePerson() {
    console.log("Changes saved")
    //showViewPerson()
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
                {/* <TextInput value={departmentId} onChangeText={setDepartmentId} style={Styles.textInput}></TextInput> */}
                
              </View>
            </View>
            {/* Address */}
            <View style={Styles.fieldSet}>
              <TextParagraph style={Styles.legend}>Address</TextParagraph>
              <View style={Styles.formRow}>
                <TextLabel>Phone:</TextLabel>
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
              ButtonStyle={Styles.personListItembttn}
              buttonText={Styles.personListItembttnText}
              onPress={savePerson}
              />
              <MyButton
              text="Cancel"
              type="default"
              size="medium"
              ButtonStyle={Styles.personListItembttn}
              buttonText={Styles.personListItembttnText}
              onPress={showViewPerson}
              />
            </View>
          </View>

      </ScrollView>
    </SafeAreaView>
  );
};