import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";
// import { createStackNavigator } from "@react-navigation/stack";

// const Stack = createStackNavigator();

class PostList extends React.Component {
  state = {
    posts: null,
  };

  componentDidMount() {
    const token = this.getToken();
  }

  async getToken() {
    try {
      let token = await AsyncStorage.getItem("token");
      this.fetchPosts(token);
    } catch (error) {}
  }

  fetchPosts = (token) => {
    fetch("http://localhost:3000/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((retrievedPosts) => {
        this.setState(
          {
            posts: [...retrievedPosts],
          },
          () => console.log(this.state.posts)
        );
      });
  };

  mapPosts = () => {
    return this.state.posts.map((post) => {
      return (
        <ListItem key={post.id} bottomDivider>
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
    console.log("in render");
    return <View>{this.state.posts !== null ? this.mapPosts() : null}</View>;
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
});

export default PostList;
