import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PendingsList from "../screens/PendingsList";

import PendingsStackNavigator from "../navigation/PendingsStackNavigator";

class PendingContainer extends React.Component {
  state = { pendings: null, error: "", pendingUser: null };

  async componentDidMount() {
    const token = await this.props.getToken();
    this.fetchPendings(token);
  }

  fetchHandler = async (pendingId) => {
    const token = await this.props.getToken();
    this.fetchPendingUser(token, pendingId);
  };

  fetchPendingUser = (token, userId) => {
    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((user) => {
        this.setState({ pendingUser: user });
      });
  };

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
          this.setState({ error: pendings.error }, () =>
            console.log(this.state.error)
          );
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.pendings !== null ? (
          <PendingsStackNavigator
            pendingUser={this.state.pendingUser}
            pendings={this.state.pendings}
            fetchHandler={this.fetchHandler}
          />
        ) : (
          <Text>{this.state.error}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default PendingContainer;
