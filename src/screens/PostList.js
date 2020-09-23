import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { ListItem, Button, ButtonGroup } from "react-native-elements";
import UserAvatar from "react-native-user-avatar";

class PostList extends React.Component {
  state = {
    selectedIndex: 0,
  };

  buttonGroupClickHandler = (selectedIndex) => {
    this.setState({ selectedIndex });
    this.props.toggleHandler();
  };

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
            <ListItem.Title>Mentee: {post.mentee_name}</ListItem.Title>
            <ListItem.Subtitle>Mentor: {post.mentor_name}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      );
    });
  };

  render() {
    const buttons = ["Mentor", "Mentee"];
    const { selectedIndex } = this.state;
    return (
      <View style={styles.container}>
        {this.props.posts !== null && this.props.posts !== undefined ? (
          <View>
            <ButtonGroup
              onPress={this.buttonGroupClickHandler}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{ height: 40 }}
            />
            <ScrollView>{this.mapPosts()}</ScrollView>
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
