import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import LoadingContainer from "react-native-loading-container";
import ImageResizer from "../components/ImageResizer";

import normalizeResult from "../utils/normalizeResult";
import ResultList from "../components/ResultList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class ResultScreen extends React.Component {
  static navigationOptions = {
    title: "Result",
    headerTintColor: "#fff",
    headerStyle: {
      backgroundColor: "#3f51b5",
    },
    headerPressColorAndroid: "rgba(255, 255, 255, 0.2)",
  };

  static propTypes = {
    navigation: PropTypes.any,
  };

  state = {
    result: null,
  };

  // refs
  resizer;

  handleLoadStart = async () => {
    const image = this.props.navigation.state.params.image;
    const thumbnail = await this.resizer.getThumbnail(image, 200);

    const formData = new FormData();
    formData.append("file", {
      name: "image.jpg",
      type: "image/jpeg",
      uri: thumbnail.uri,
    });

    const response = await fetch(
      "https://saucenao.com/search.php?output_type=2",
      {
        method: "POST",
        body: formData,
      },
    );
    const result = await response.json();

    return result;
  };

  handleReady = result => {
    return new Promise(resolve => {
      this.setState({ result: normalizeResult(result) }, resolve);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageResizer
          ref={resizer => {
            this.resizer = resizer;
          }}
        />
        <LoadingContainer
          onLoadStartAsync={this.handleLoadStart}
          onReadyAsync={this.handleReady}
        >
          <ResultList
            image={this.props.navigation.state.params.image}
            data={this.state.result}
          />
        </LoadingContainer>
      </View>
    );
  }
}

export default ResultScreen;
