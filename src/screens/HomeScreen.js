import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Button } from "react-native";
import { ImagePicker } from "expo";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    borderRadius: 2,
    backgroundColor: "#e91e63",
  },

  buttonText: {
    color: "#fff",
  },
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.any,
  };

  handlePress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.8,
      exif: false,
    });
    if (result.cancelled) {
      return;
    }
    this.props.navigation.navigate("Result", { image: result });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Select Image" onPress={this.handlePress} />
      </View>
    );
  }
}

export default HomeScreen;
