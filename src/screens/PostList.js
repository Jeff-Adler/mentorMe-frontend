import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Button } from "react-native-elements";
import UserAvatar from "react-native-user-avatar";

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
          {/* <UserAvatar size={50} bgColor="#3498db" name="Avishay Bar" /> */}
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
        {this.props.posts !== null && this.props.posts !== undefined ? (
          <View>
            <Button
              title="Toggle Mentor/Mentee"
              onPress={this.props.toggleHandler}
            />
            {this.mapPosts()}
          </View>
        ) : null}
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
    // justifyContent: "center",
    alignItems: "stretch",
  },
});

export default PostList;
