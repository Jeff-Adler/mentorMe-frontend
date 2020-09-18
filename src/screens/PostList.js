import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage";

const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman",
  },
];

class PostList extends React.Component {
  state = {
    posts: null,
  };

  componentDidMount() {
    const token = this.getToken();
    console.log("Token:", token);
    // if (token) {
    //   this.fetchPosts(token);
    // }
  }

  async getToken() {
    console.log("starting gettokeN");
    try {
      let token = await AsyncStorage.getItem("token");
      console.log("Inside getToken:", token);
      this.fetchPosts(token);
    } catch (error) {
      console.log("Something went wrong", error);
    }
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
        console.log("Received Posts:", retrievedPosts);
        // this.setState({
        //   posts: [...retrievedPosts],
        // });
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
            <ListItem.Title>{post.id}</ListItem.Title>
            <ListItem.Subtitle>{post.connection_id}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    });
  };

  render() {
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
