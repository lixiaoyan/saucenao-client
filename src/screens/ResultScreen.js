import React from "react";
import PropTypes from "prop-types";
import LoadingContainer from "react-native-loading-container";

import normalizeResult from "../utils/normalizeResult";
import ResultList from "../components/ResultList";

class ResultScreen extends React.Component {
  static navigationOptions = {
    title: "Result",
  };

  static propTypes = {
    navigation: PropTypes.any,
  };

  state = {
    result: null,
  };

  handleLoadStart = async () => {
    const image = this.props.navigation.state.params.image;

    const formData = new FormData();
    formData.append("file", {
      name: "image.jpg",
      type: "image/jpeg",
      uri: image.uri,
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
      <LoadingContainer
        onLoadStartAsync={this.handleLoadStart}
        onReadyAsync={this.handleReady}
      >
        <ResultList data={this.state.result} />
      </LoadingContainer>
    );
  }
}

export default ResultScreen;
