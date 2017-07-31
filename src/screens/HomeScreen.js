import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import { ImagePicker } from "expo";
import Touchable from "react-native-platform-touchable";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    elevation: 2,
    width: 160,
    height: 80,
    borderRadius: 2,
    backgroundColor: "#e91e63",
  },

  buttonLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontFamily: "sans-serif-condensed",
    fontSize: 16,
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
        <View style={styles.button}>
          <Touchable
            style={styles.buttonLayout}
            background={Touchable.SelectableBackgroundBorderless()}
            onPress={this.handlePress}
          >
            <Text style={styles.buttonText}>Select Image</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
