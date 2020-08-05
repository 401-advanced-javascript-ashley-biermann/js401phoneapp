import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// opt in to the redux store
import { connect } from 'react-redux';
// get access to function(s) from redux store
import { pickPhoto } from '../reduxstore/photos.js';



const Main = props => {
  console.log('props from Main', props);


  // selected photo
  let { selectedPhoto } = props;
  console.log('selectedPhoto', selectedPhoto);

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
    // console.log('picker result.uri', pickerResult.uri);

    if (pickerResult.cancelled === true) {
      return;
    }

    // set state
    console.log('props inside of openImagePickerAsync', props);

    props.pickPhoto(pickerResult.uri);
  };




  // function that, onPress, will open a variety of ways for uses to share photo
  let openShareDialogAsync = async () => {

    // check for ability to share
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedPhoto.localUri);
  };



  // once image is selected, display this
  if (selectedPhoto !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedPhoto.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
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
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }
});