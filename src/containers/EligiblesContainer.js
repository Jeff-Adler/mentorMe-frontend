import React from "react";
// import AsyncStorage from "@react-native-community/async-storage";
import { View, StyleSheet, Text } from "react-native";
import EligiblesCardStack from "../screens/EligiblesCardStack";

class EligiblesContainer extends React.Component {
  state = { eligibles: null };

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
        this.setState(
          {
            eligibles: eligibles,
          },
          () => console.log(eligibles)
        );
      });
  };

  render() {
    return <EligiblesCardStack eligibles={this.state.eligibles} />;
  }
}

export default EligiblesContainer;
