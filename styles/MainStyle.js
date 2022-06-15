import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";
import Colours from "../constants/Colours";
import NetInfo from "@react-native-community/netinfo";

export default StyleSheet.create({

    // Add status bar space for Android (<SafeAreaView> currently only works on iOS)
    safeAreaView: {  
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    
    // GENERAL STYLES

    container: {
        flex: 1,
        backgroundColor: Colours.roiWhite,
    },
    contentContainer: {
        padding: 10,
        paddingTop: 20,
    },
    bodyText: {
        marginVertical: 5,
        fontSize: 17,
        color: Colours.roiCharcoal,  // COLOUR: dark grey
        lineHeight: 24,
    },
    h1: {
        marginTop: 30,
        marginBottom: 5,
        fontSize: 30,
        color: Colours.roired,  // COLOUR: primary colour 1
        lineHeight: 35,
    },
    h2: {
        marginTop: 20,
        marginBottom: 5,
        fontSize: 24,
        color: Colours.roiCharcoal,  // COLOUR: primary colour 2
        lineHeight: 24,
    },
    h3: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 20,
        color: Colours.roiMidGrey,  // COLOUR: medium grey
        lineHeight: 25,
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        paddingLeft: 50,
        fontSize: 17,
    },
    listItemBullet: {
        position: 'absolute',
        top: 1,
        left: 30,
    },
    button: {
        paddingVertical: 13,
        paddingHorizontal: 26,
        backgroundColor: Colours.roiMidGrey,  // COLOUR: medium grey
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    buttonMajor: {
        backgroundColor: Colours.roired,  // COLOUR: primary colour 1
    },
    buttonMajorText: {
        color: 'white',
    },
    buttonMinor: {
        backgroundColor: Colours.roiLightGrey,  // COLOUR: light grey
    },
    buttonMinorText: {
        color: Colours.roiCharcoal,  // COLOUR: dark grey
    },
    buttonSmall: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    buttonSmallText: {
        fontSize: 16,
    },
    buttonLarge: {
        paddingVertical: 22,
        paddingHorizontal: 36,
    },
    buttonLargeText: {
        fontSize: 20,
    },
    form: {
        marginVertical: 10,
    },
    fieldSet: {
        marginVertical: 15,
        paddingTop: 15,
        paddingBottom: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: Colours.roiLightGrey,  // COLOUR: light grey
        borderRadius: 5,
    },
    legend: {
        position: 'absolute',
        top: -18,
        left: 5,
        margin: 0,
        paddingHorizontal: 5,
        paddingVertical: 0,
        color: Colours.roiBurntOrange,  // COLOUR: main secondary colour
        backgroundColor: 'white',
    },
    formRow: {
        flex: 1,
        flexDirection: 'row',
        flexBasis: "auto",
        marginVertical: 2,
    },
    label: {
        width: 110,
        flexGrow: 0,
        flexShrink: 0,
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 17,
    },
    textInput: {
        flexGrow: 1,
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderColor: Colours.roiLightGrey,  // COLOUR: light grey
        borderRadius: 3,
    },
    picker: {
        flexGrow: 1,
        width: "100%",
        height: 42,
        // maxHeight: 40,
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderColor: Colours.roiLightGrey,  // COLOUR: light grey
        borderRadius: 3,
    },
    pickerItem: {
        height: 42,
    },
    
    // HEADER
    
    headerBar: {
        backgroundColor: 'white',
    },
    headerBarTitle: {
        color: Colours.roired,  // COLOUR: primary colour 1
        textAlign: 'left',
    },
    logoAndTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    logoSize: {
        width: 110, 
        height: 63.6,
    },

    // FOOTER NAVIGATION

    navBar: {
        backgroundColor: Colours.roiCharcoal,  // COLOUR: dark grey
    },
    navBarIcon: {
        marginBottom: -5
    },
    navBarLabel: {
        marginBottom: 3
    },

    // HOME SCREEN

    homeHeading: {
        fontSize: 40,
        lineHeight: 45,
        textAlign: 'center',
        color: Colours.roired,
    },
    homeHeadingContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
        marginBottom: 30,
    },
    homeBttnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    homeBttn: {
        flex: 1,
        marginHorizontal: 35,
        paddingHorizontal:10,
        paddingVertical: 1,
    },
    homeLogo: {
        width: 305, 
        height: 159,
        resizeMode: 'contain',
    },
    homeLogoContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
        justifyContent: 'center',
    },

    // HELP SCREEN

    // View People Screen
    peopleButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colours.roiCharcoal,
    },
    personList: {

    },
    personListItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderBottomWidth: 2,
        borderBottomColor: Colours.roiLightGrey,
    },
    personListItemDetails: {
        flex: 1,
    },
    personListItemName: {
        fontSize: 22,
        marginTop: 2,
    },
    personListItemText: {
        fontSize: 15,
        marginVertical: 1,
        marginLeft: 10,
    },
    personListItemBttns: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'space-between',
        marginBottom: 10,
        padding: 10,
    },
    personListBttn: {
        width: `${(Dimensions.get('screen').width)}px`,
    },
    personListItembttnText: {},
});
