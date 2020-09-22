import React from "react";
import { View, Text, StyleSheet } from "react-native";

import PendingsStackNavigator from "../navigation/PendingsStackNavigator";

class PendingContainer extends React.Component {
  state = {
    pendingUsers: null,
    error: "",
    pendingUser: null,
  };

  async componentDidMount() {
    const token = await this.props.getToken();
    this.fetchPendings(token);
  }

  acceptPending = async (userId) => {
    const token = await this.props.getToken();
    const configObj = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: { user_id: userId } }),
    };

    fetch(
      `http://localhost:3000/api/v1/users/${this.props.currentUser.id}/accept_pending`,
      configObj
    )
      .then((response) => response.json())
      .then((connection) => {
        console.log(connection);
      });
  };

  // acceptPending = async (userId) => {
  //   const token = await this.props.getToken();
  //   const configObj = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   fetch(
  //     `http://localhost:3000/connections/${userId}/${this.props.currentUser.id}/accept`,
  //     configObj
  //   )
  //     .then((response) => response.json())
  //     .then((connection) => {
  //       console.log(connection);
  //     });
  // };

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
      .then((data) => {
        this.setState({ pendingUser: data.user });
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
            pendingUsers: pendings.pending_users,
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
            acceptPending={this.acceptPending}
            pendingUser={this.state.pendingUser}
            pendingUsers={this.state.pendingUsers}
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
