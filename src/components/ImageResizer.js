import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { takeSnapshotAsync } from "expo";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    overflow: "hidden",
    width: 0,
    height: 0,
  },
});

class ImageResizer extends React.Component {
  state = {
    image: null,
  };

  loadPromise = null;
  loadDefer = null;

  // refs
  image;

  async getThumbnail(image, size) {
    if (this.loadDefer) {
      this.loadDefer.reject();
      this.loadDefer = null;
    }

    const scale = Math.min(size / image.width, size / image.height);
    const width = Math.floor(image.width * scale);
    const height = Math.floor(image.height * scale);

    this.loadPromise = new Promise((resolve, reject) => {
      this.loadDefer = { resolve, reject };
    });
    this.setState({
      image: {
        uri: image.uri,
        width,
        height,
      },
    });
    await this.loadPromise;

    const thumbnail = await takeSnapshotAsync(this.image, {
      format: "jpeg",
      quality: 0.8,
    });
    return {
      uri: thumbnail,
      width,
      height,
    };
  }

  handleLoad = () => {
    if (this.loadDefer) {
      this.loadDefer.resolve();
      this.loadDefer = null;
    }
  };

  handleError = () => {
    if (this.loadDefer) {
      this.loadDefer.reject();
      this.loadDefer = null;
    }
  };

  render() {
    const image = this.state.image;
    return (
      <View style={styles.container} collapsable={false}>
        {image &&
          <Image
            ref={image => {
              this.image = image;
            }}
            source={image}
            fadeDuration={0}
            onLoad={this.handleLoad}
            onError={this.handleError}
          />}
      </View>
    );
  }
}

export default ImageResizer;
