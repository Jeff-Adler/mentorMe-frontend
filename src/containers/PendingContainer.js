import React from "react";
import { View, Text } from "react-native";

class PendingContainer extends React.Component {
  state = { pendings: null, error: "" };

  async componentDidMount() {
    const token = await this.props.getToken();
    this.fetchPendings(token);
  }

  fetchPendings = (token) => {
    fetch(
      `http://localhost:3000/api/v1/users/${this.props.currentUser.id}/retrieve_pendings`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((pendings) => {
        if (Object.keys(pendings)[0] !== "error") {
          this.setState({
            pendings: pendings,
          });
        } else {
          this.setState({ error: pendings.error });
        }
      });
  };

  render() {
    return (
      <View>
        <Text>Test</Text>
      </View>
    );
  }
}

export default PendingContainer;
