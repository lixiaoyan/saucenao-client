import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, FlatList } from "react-native";

import ResultItem from "./ResultItem";

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});

class ResultList extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
  };

  renderItem = ({ item }) => {
    if (item.type === "unknown") {
      return null;
    }
    return <ResultItem data={item} />;
  };

  render() {
    return (
      <FlatList
        style={styles.container}
        data={this.props.data}
        keyExtractor={(item, index) => index}
        renderItem={this.renderItem}
      />
    );
  }
}

export default ResultList;
