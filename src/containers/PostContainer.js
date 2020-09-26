import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ThemeConsumer } from "react-native-elements";
import PostStackNavigator from "../navigation/PostStackNavigator";

POSTTYPES = {
  mentor: "mentee",
  mentee: "mentor",
};

class PostContainer extends React.Component {
  state = {
    posts: null,
    filteredPosts: null,
    postToggler: true,
    postType: "mentor",
    post: null,
  };

  async componentDidMount() {
    //this fetches all posts AND filters post, but this.filterPost() is called in this.fetchPosts() after async event
    const token = await this.props.getToken();
    this.fetchPosts(token);
    // if (this.state.postToggler === true) {
    //   this.fetchMentorPosts(token);
    // } else {
    //   this.fetchMenteePosts(token);
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.postType !== prevState.postType) {
      this.filterPosts();
    }
  }

  filterPosts = () => {
    const unfilteredPosts = [...this.state.posts];
    let filteredPosts;
    if (this.state.postType === "mentor") {
      filteredPosts = unfilteredPosts.filter((post) => {
        return post.mentor.id === this.props.currentUser.id;
      });
    } else if (this.state.postType === "mentee") {
      filteredPosts = unfilteredPosts.filter((post) => {
        return post.mentee.id === this.props.currentUser.id;
      });
    }
    this.setState({ filteredPosts: filteredPosts });
  };

  //prevProps is listed because prevState is 2nd argument for componentDidUpdate

  // async componentDidUpdate(prevProps, prevState) {
  //   const token = await this.props.getToken();
  //   if (this.state.postToggler !== prevState.postToggler) {
  //     if (this.state.postToggler === true) {
  //       this.fetchMentorPosts(token);
  //     } else {
  //       this.fetchMenteePosts(token);
  //     }
  //   }
  // }

  // toggleHandler = () => {
  //   this.setState({ postToggler: !this.state.postToggler });
  // };

  toggleHandler = () => {
    const temp = this.state.postType;
    this.setState({ postType: POSTTYPES[temp] });
  };

  //fetch post handler
  fetchHandler = async (postId) => {
    const token = await this.props.getToken();
    this.fetchPost(token, postId);
  };

  fetchPosts = (token) => {
    fetch(
      `http://localhost:3000/api/v1/users/${this.props.currentUser.id}/posts`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((retrievedPosts) => {
        this.setState(
          {
            posts: retrievedPosts,
          },
          () => this.filterPosts()
        );
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
        this.setState({
          posts: menteePosts,
        });
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
        {this.state.filteredPosts !== null &&
        this.state.filteredPosts !== undefined ? (
          <PostStackNavigator
            posts={this.state.filteredPosts}
            postToggler={this.state.postToggler}
            postType={this.state.postType}
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
