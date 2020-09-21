import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

class PostList extends React.Component {
  clickHandler = (post) => {
    this.props.fetchHandler(post.id);
    this.props.navigation.navigate("Post");
  };

  mapPosts = () => {
    return this.props.posts.map((post) => {
      const storedPost = post;
      return (
        <ListItem
          onPress={() => this.clickHandler(storedPost)}
          key={post.id}
          bottomDivider
        >
          <Avatar
            style={styles.avatar}
            source={{ uri: "http://tinygraphs.com/labs/squares/random" }}
          />
          <ListItem.Content>
            <ListItem.Title>{post.mentee_name}</ListItem.Title>
            <ListItem.Subtitle>{post.mentor_name}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.posts !== null ? this.mapPosts() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostList;
