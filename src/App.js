import React from "react";
import { StyleSheet, View } from "react-native";
import { Constants } from "expo";

import AppNavigation from "./AppNavigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  statusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: "#3f51b5",
  },
});

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar} />
        <AppNavigation />
      </View>
    );
  }
}

export default App;
