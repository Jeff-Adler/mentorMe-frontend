import React from "react";
// import AsyncStorage from "@react-native-community/async-storage";
import { View, StyleSheet, Text } from "react-native";
import EligiblesCardStack from "../screens/EligiblesCardStack";

class EligiblesContainer extends React.Component {
  state = { eligibles: null, error: "", isLoaded: false };

  async componentDidMount() {
    const token = await this.props.getToken();
    this.fetchEligibles(token);
  }

  fetchEligibles = (token) => {
    fetch(
      `http://localhost:3000/api/v1/users/${this.props.currentUser.id}/retrieve_eligibles`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((eligibles) => {
        if (
          Object.keys(eligibles)[0] !== "error" &&
          Object.keys(eligibles)[0] !== "status"
        ) {
          this.setState({
            eligibles: eligibles,
            isLoaded: true,
          });
        } else {
          this.setState({ error: eligibles.error });
        }
      });
  };

  handleSwipeRight = async (mentorId) => {
    const connection = {
      mentee_id: this.props.currentUser.id,
      mentor_id: mentorId,
    };
    const token = await this.props.getToken();
    fetch(`http://localhost:3000/connections`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ connection: connection }),
    })
      .then((response) => response.json())
      .then((connection) => {
        console.log(connection);
      });
  };

  render() {
    return (
      <View>
        {this.state.eligibles !== null &&
        this.state.error === "" &&
        this.state.isLoaded === true ? (
          <EligiblesCardStack
            handleSwipeRight={this.handleSwipeRight}
            eligibles={this.state.eligibles}
          />
        ) : (
          <Text>{this.state.error}</Text>
        )}
      </View>
    );
  }
}

export default EligiblesContainer;
