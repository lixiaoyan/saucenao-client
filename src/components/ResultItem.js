import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, Image } from "react-native";
import { WebBrowser } from "expo";
import Touchable from "react-native-platform-touchable";

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    margin: 4,
    borderRadius: 2,
    backgroundColor: "#fff",
  },

  layout: {
    flexDirection: "row",
    borderRadius: 2,
  },

  thumbnail: {
    borderRightWidth: 1,
    borderRightColor: "rgba(0, 0, 0, 0.1)",
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    backgroundColor: "#f5f5f5",
  },

  thumbnailImage: {
    width: 96,
    height: 96,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },

  meta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  type: {
    justifyContent: "center",
    height: 16,
    marginRight: 4,
    paddingHorizontal: 4,
    borderRadius: 2,
    backgroundColor: "#e91e63",
  },

  typeText: {
    fontFamily: "sans-serif-condensed",
    fontSize: 10,
    color: "#fff",
  },

  id: {
    fontFamily: "sans-serif-condensed",
    fontSize: 10,
    color: "rgba(0, 0, 0, 0.4)",
  },

  title: {
    fontFamily: "sans-serif-condensed",
    fontSize: 16,
  },

  author: {
    marginTop: 4,
  },

  authorText: {
    fontFamily: "sans-serif-condensed",
    fontSize: 10,
    color: "rgba(0, 0, 0, 0.4)",
  },
});

class ResultItem extends React.Component {
  static propTypes = {
    data: PropTypes.object,
  };

  handlePress = () => {
    WebBrowser.openBrowserAsync(this.props.data.url);
  };

  render() {
    const data = this.props.data;
    return (
      <View style={styles.container}>
        <Touchable
          background={Touchable.SelectableBackgroundBorderless()}
          onPress={this.handlePress}
        >
          <View style={styles.layout} pointerEvents="box-only">
            <View style={styles.thumbnail}>
              <Image
                style={styles.thumbnailImage}
                source={{ uri: data.thumbnail }}
              />
            </View>
            <View style={styles.content}>
              <View style={styles.meta}>
                <View style={styles.type}>
                  <Text style={styles.typeText}>
                    {data.type.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.id}>
                  {data.id}
                </Text>
              </View>
              <Text style={styles.title} numberOfLines={1}>
                {data.title || "·"}
              </Text>
              <View style={styles.author}>
                <Text style={styles.authorText}>
                  {data.author.name}
                </Text>
              </View>
            </View>
          </View>
        </Touchable>
      </View>
    );
  }
}

export default ResultItem;
