import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeConsumer } from "react-native-elements";
import PostStackNavigator from "../navigation/PostStackNavigator";

class PostContainer extends React.Component {
  state = {
    posts: null,
    postToggler: true,
    post: null,
  };

  async componentDidMount() {
    const token = await this.props.getToken();
    if (this.state.postToggler === true) {
      this.fetchMentorPosts(token);
    } else {
      this.fetchMenteePosts(token);
    }
  }

  //prevProps is listed because prevState is 2nd argument for componentDidUpdate
  async componentDidUpdate(prevProps, prevState) {
    const token = await this.props.getToken();
    if (this.state.postToggler !== prevState.postToggler) {
      if (this.state.postToggler === true) {
        this.fetchMentorPosts(token);
      } else {
        this.fetchMenteePosts(token);
      }
    }
  }

  toggleHandler = () => {
    this.setState({ postToggler: !this.state.postToggler });
  };

  //fetch post handler
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
        this.setState({
          posts: mentorPosts,
        });
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
            posts: menteePosts,
          },
          () => console.log("Mentees: ", menteePosts)
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
        {this.state.posts !== null && this.state.posts[0] !== null ? (
          <PostStackNavigator
            posts={this.state.posts}
            toggleHandler={this.toggleHandler}
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
