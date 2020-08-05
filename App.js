import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

import Main from './pages/main.js';

import { Provider } from 'react-redux'; // set up the global state
import store from './reduxstore'; // if it goes to folder, it will default to look at index.js

export default function App() {

  // selected image
  // const [selectedImage, setSelectedImage] = React.useState(null);

  // // function to let user choose a photo and set it to state
  // // FIXME: NOTE: This function not used here any longer - it is housed in Main. Working on offload to another component
  // let openImagePickerAsync = async () => {

  //   // check for permissions....
  //   let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

  //   if (permissionResult.granted === false) {
  //     alert("Permission to access camera roll is required!");
  //     return;
  //   }

  //   // permissions granted!
  //   let pickerResult = await ImagePicker.launchImageLibraryAsync();
  //   // console.log('picker result', pickerResult);

  //   if (pickerResult.cancelled === true) {
  //     return;
  //   }

  //   // set state
  //   setSelectedImage({ localUri: pickerResult.uri });
  // };

// FIXME: THis one is also now in Main
  // function that, onPress, will open a variety of ways for uses to share photo
  // let openShareDialogAsync = async () => {

  //   // check for ability to share
  //   if (!(await Sharing.isAvailableAsync())) {
  //     alert(`Uh oh, sharing isn't available on your platform`);
  //     return;
  //   }

  //   await Sharing.shareAsync(selectedImage.localUri);
  // };

  //FIXME: this IF is now in Main
  // once image is selected, display this
  // if (selectedImage !== null) {
  //   return (
  //     <View style={styles.container}>
  //       <Image
  //         source={{ uri: selectedImage.localUri }}
  //         style={styles.thumbnail}
  //       />
  //       <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
  //         <Text style={styles.buttonText}>Share this photo</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Main />

        {/* <Image source={{ uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80' }} style={styles.logo} />
      <Text style={styles.instructions}>
      Let's Share Cute Dog Photos!
      </Text> */}

        {/* <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity> */}
      </Provider>
    </View>
  );
}

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
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
