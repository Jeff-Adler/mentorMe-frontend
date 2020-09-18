import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

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
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((posts) =>
        this.setState({
          posts: posts,
        })
      );
  }

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
