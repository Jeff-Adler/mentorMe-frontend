import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PostStackNavigator from "../navigation/PostStackNavigator";

class PostContainer extends React.Component {
  state = {
    posts: null, //can probably delete
    mentorPosts: null,
    menteePosts: null,
    post: null,
  };

  async componentDidMount() {
    const token = await this.props.getToken();
    this.fetchMentorPosts(token);
    this.fetchMenteePosts(token);
  }

  fetchHandler = async (postId) => {
    const token = await this.props.getToken();
    this.fetchPost(token, postId);
  };

  fetchPosts = (token) => {
    fetch("http://localhost:3000/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((retrievedPosts) => {
        this.setState({
          posts: retrievedPosts,
        });
      });
  };

  fetchMentorPosts = (token) => {
    fetch(
      `http://localhost:3000/api/v1/users/${this.props.currentUser.id}/posts/mentor`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((mentorPosts) => {
        this.setState(
          {
            mentorPosts: mentorPosts,
          },
          () => console.log(this.state.mentorPosts)
        );
      });
  };

  fetchMenteePosts = (token) => {
    fetch(
      `http://localhost:3000/api/v1/users/${this.props.currentUser.id}/posts/mentee`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((menteePosts) => {
        this.setState(
          {
            menteePosts: menteePosts,
          },
          () => console.log(this.state.menteePosts)
        );
      });
  };

  //may not need this!
  fetchPost = (token, postId) => {
    fetch(`http://localhost:3000/posts/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((post) => {
        this.setState({ post: post });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.posts !== null ? (
          <PostStackNavigator
            posts={this.state.posts}
            fetchHandler={this.fetchHandler}
            post={this.state.post}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PostContainer;
