import React from 'react';

import { Text, StyleSheet, View } from 'react-native';

export const Header = props => {

  return (
    <View style={styles.container}>

        <Text style={styles.header}>
          Doggos Galore!
        </Text>

    </View>
  )
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: .2,
    width: 400,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginTop: 40,
    margin: 10,
    padding: 20,
  }
});
