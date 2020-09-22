import React from "react";
import { View, Text, StyleSheet } from "react-native";

class Post extends React.Component {
  render() {
    const { post } = this.props;
    return (
      <View style={styles.container}>
        {post !== null ? (
          <View>
            <Text>{post.id}: DISCUSSION PLACEHOLDER</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Post;
