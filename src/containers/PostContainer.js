import React from "react";

class PostContainer extends React.Component {
  componentDidMount() {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((posts) =>
        this.setState({
          posts: posts,
        })
      );
  }
}

export default PostContainer;
