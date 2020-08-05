import React, { useEffect } from 'react';
import { Alert, BackHandler, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';


// opt in to the redux store
import { connect } from 'react-redux';
// get access to function(s) from redux store
import { pickPhoto } from '../reduxstore/photos.js';



const Main = props => {

  // TODO: This will currently just exit the app if user presses back, but it does ask them first, and could be modified to use state to store the previous 'page'

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Oops!", "This will exit the app, did you mean to quit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        // do something there other than exit the app
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);




  // selected photo
  let { selectedPhoto } = props;

  // function to let user choose a photo and set it to state
  let openImagePickerAsync = async () => {

    // check for permissions....
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // permissions granted!
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    // set state in the store
    props.pickPhoto(pickerResult.uri);
  };



  // function that, onPress, will open a variety of ways for uses to share photo
  let openShareDialogAsync = async () => {

    // check for ability/permission? to share
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedPhoto.selectedPhoto);
  };


  // once image is selected, display this
  if (selectedPhoto !== null) {
    let imageUri = props.selectedPhoto.selectedPhoto;
    console.log('imageUri', typeof imageUri, imageUri);
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: imageUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}>
        <Text style={styles.buttonText}>Choose Different</Text>
      </TouchableOpacity>

      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Image source={{ uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80' }} style={styles.logo} />
      <Text style={styles.instructions}>
        Let's Share Cute Dog Photos!
    </Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>

    </View>

  )
}

// get the global state stuff that I want and apply ('map') it to my props
const mapStateToProps = state => {
  // console.log('state', state);
  return {
    selectedPhoto: state.selectedPhoto,
  }
}

// get the global functions from the store that I want to applpy ('map') to my props
const mapDispatchToProps = { pickPhoto };

// connect the functions and state abilities to props and the global state, and export Main 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);


//STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "purple",
    margin: 10,
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }, 
  thumbnail: {
    margin: 20,
    width: 300,
    height: 300, 
  },
  // TODO: MOve this with header
  header: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  }
});