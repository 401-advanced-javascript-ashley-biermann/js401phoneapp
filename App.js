import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from './pages/header.js';
import Main from './pages/main.js';

import { Provider } from 'react-redux'; // set up the global state
import store from './reduxstore'; // if it goes to folder, it will default to look at index.js

export default function App() {

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Header />
        <Main />
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
  }
});
