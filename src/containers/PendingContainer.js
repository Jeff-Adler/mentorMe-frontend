import React from "react";
import { View, Text } from "react-native";
import PendingsList from "../screens/PendingsList";

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
          this.setState(
            {
              pendings: pendings,
            },
            () => console.log(this.state.pendings)
          );
        } else {
          this.setState({ error: pendings.error }, () =>
            console.log(this.state.error)
          );
        }
      });
  };

  render() {
    return (
      <View>
        {this.state.pendings !== null ? (
          <PendingsList pendings={this.state.pendings} />
        ) : (
          <Text>{this.state.error}</Text>
        )}
      </View>
    );
  }
}

export default PendingContainer;
