import React from "react";
import { View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();

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
        this.setState(
          {
            posts: posts,
          },
          console.log("Posts loaded", posts)
        )
      );
  }

  mapPosts = () => {
    return this.state.posts.map((post) => {
      console.log(post);
      return (
        <ListItem key={post.id} bottomDivider>
          <Avatar source={{ uri: generator.generateRandomAvatar() }} />
          <ListItem.Content>
            <ListItem.Title>{post.id}</ListItem.Title>
            <ListItem.Subtitle>{post.connection_id}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    });
  };

  render() {
    // console.log(generator.generateRandomAvatar());
    return <View>{this.state.posts !== null ? this.mapPosts() : null}</View>;
  }
}

export default PostList;
