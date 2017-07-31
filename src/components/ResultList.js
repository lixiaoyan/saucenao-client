import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Image, FlatList } from "react-native";

import ResultItem from "./ResultItem";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 4,
  },

  header: {
    elevation: 2,
    marginBottom: 4,
    backgroundColor: "#f5f5f5",
  },

  image: {
    height: 240,
  },

  item: {
    marginHorizontal: 4,
  },
});

class ResultList extends React.Component {
  static propTypes = {
    image: PropTypes.object,
    data: PropTypes.arrayOf(PropTypes.object),
  };

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Image style={styles.image} source={{ uri: this.props.image.uri }} />
      </View>
    );
  };

  renderItem = ({ item }) => {
    if (item.type === "unknown") {
      return null;
    }
    return (
      <View style={styles.item}>
        <ResultItem data={item} />
      </View>
    );
  };

  render() {
    return (
      <FlatList
        contentContainerStyle={styles.container}
        data={this.props.data}
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

export default ResultList;
