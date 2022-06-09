import * as React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

// Import helper code
import Settings from '../constants/Settings';
import { RoiGetPeople } from '../utils/Api';
import { PopupOk } from '../utils/Popup';

// Import styling and components
import { TextParagraph, TextH1 } from "../components/StyledText";
import Styles from "../styles/MainStyle";
import { MyButton } from '../components/MyButton';


export default function ViewPeopleScreen(props) {

  //State - data for this component
  const [people, setPeople] = React.useState([])

  //Set 'effect' to retieve and store data - only run on mount/unmount (loaded/unloaded)
  //'effectful' code is something the triggers a UI re-render
  React.useEffect(ShowAddperson, [])

  function ShowAddperson()
  {
    console.log("show add person....")
    
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

  function RefreshPersonList()
  {
    console.log("Refresh page.....")

    //setPeople([...people, "Mr. Extra"])
  }

  function DisplayPeople()
  {
    //loop through the people that are being returned, appropriate output and then return result
    return people.map(p => {
      //create an output view for each item
      return (
        <View>
          <TextParagraph>{p.name}</TextParagraph>
        </View>
      )
    })
  }

  return (
    <SafeAreaView style={Styles.safeAreaView}>
        <Image source = {require ('../assets/images/roi-logo.jpg')} style = {{ width: 110, height: 55 }}/>
        <TextH1 style={{marginTop:0}}>View All People</TextH1>
        <View style = {Styles.personButtonContainer}>
          
          <MyButton
            text="Add +"
            type="major"
            size="small"
            
            onPress={ShowAddperson}
          />
          <MyButton
            text="Refress"
            type="major"
            size="small"
            
            onPress={RefreshPersonList}
          />
        </View>


        <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>  

          <View>
            {DisplayPeople()}
          </View>

      </ScrollView>
    </SafeAreaView>
  );
}