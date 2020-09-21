import React from "react";
import { View, Text } from "react-native";

class Post extends React.Component {
  render() {
    const { post } = this.props;
    return (
      <View>
        {post !== null ? (
          <View>
            <Text>{post.id}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

export default Post;
