import React from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import PostStackNavigator from "../navigation/PostStackNavigator";

POSTTYPES = {
  mentor: "mentee",
  mentee: "mentor",
};

//Hook to refetch Posts when NavTab is clicked
function RefetchPosts({ getToken, fetchPosts }) {
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const refetchPosts = async () => {
        try {
          const token = await getToken();

          if (isActive) {
            fetchPosts(token);
          }
        } catch (e) {
          console.log(e);
        }
      };

      refetchPosts();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return null;
}

class PostContainer extends React.Component {
  state = {
    posts: null,
    filteredPosts: null,
    postType: "mentor",
    postId: null,
    messages: null,
  };

  async componentDidMount() {
    //this fetches all posts AND filters post, but this.filterPost() is called in this.fetchPosts() after async event
    const token = await this.props.getToken();
    this.fetchPosts(token);
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

  toggleHandler = () => {
    const temp = this.state.postType;
    this.setState({ postType: POSTTYPES[temp] });
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

  fetchHandler = async (postId) => {
    const token = await this.props.getToken();
    await this.fetchMessages(token, postId);
  };

  fetchMessages = async (token, postId) => {
    await fetch(`http://localhost:3000/posts/${postId}/messages`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((messages) => {
        this.setState({ messages: messages, postId: postId });
      });
  };

  messageHandler = async (messageObj, postId) => {
    const token = await this.props.getToken();
    this.postMessage(token, messageObj, postId);
  };

  postMessage = (token, messageObj, postId) => {
    const configObj = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ message: messageObj[0] }),
    };

    fetch(
      `http://localhost:3000/api/v1/users/${this.props.currentUser.id}/posts/${postId}/messages`,
      configObj
    ).then((response) => response.json());
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.filteredPosts !== null &&
        this.state.filteredPosts !== undefined ? (
          <View style={styles.container}>
            <RefetchPosts
              getToken={this.props.getToken}
              fetchPosts={this.fetchPosts}
            />
            <PostStackNavigator
              posts={this.state.filteredPosts}
              postId={this.state.postId}
              postType={this.state.postType}
              toggleHandler={this.toggleHandler}
              fetchHandler={this.fetchHandler}
              messages={this.state.messages}
              currentUser={this.props.currentUser}
              messageHandler={this.messageHandler}
            />
          </View>
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
