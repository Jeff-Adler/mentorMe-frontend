import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import EligiblesStackNavigator from "../navigation/EligiblesStackNavigator";

//Hook to refetch Pendings when NavTab is clicked
function RefetchEligibles({ getToken, fetchEligibles }) {
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const refetchEligibles = async () => {
        try {
          const token = await getToken();

          if (isActive) {
            fetchEligibles(token);
          }
        } catch (e) {
          console.log(e);
        }
      };

      refetchEligibles();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return null;
}

class EligiblesContainer extends React.Component {
  state = {
    eligibles: null,
    eligibleToggler: "professional",
    error: "",
    isLoaded: false,
  };

  async componentDidMount() {
    const token = await this.props.getToken();
    this.fetchEligibles(token);
  }

  //this ensures list of eligibles refreshes after a user edits their info
  async componentDidUpdate(prevProps) {
    const token = await this.props.getToken();
    if (this.props.currentUser !== prevProps.currentUser) {
      this.fetchEligibles(token);
    }
  }

  toggleHandler = async (buttonIndex) => {
    if (buttonIndex === 0) {
      this.setState({ eligibleToggler: "professional" });
    } else if (buttonIndex === 1) {
      this.setState({ eligibleToggler: "interpersonal" });
    } else {
      this.setState({ eligibleToggler: "self_improvement" });
    }
    const token = await this.props.getToken();
    this.fetchEligibles(token);
  };

  fetchEligibles = (token) => {
    fetch(
      `http://localhost:3000/api/v1/users/${this.props.currentUser.id}/retrieve_eligibles/${this.state.eligibleToggler}`,
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
      mentor_type: this.state.eligibleToggler,
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
    }).then((response) => response.json());
  };

  render() {
    const { eligibles } = this.state;
    return (
      <View style={styles.container}>
        {this.state.eligibles !== null &&
        this.state.error === "" &&
        this.state.isLoaded === true ? (
          <View style={styles.nestedContainer}>
            <RefetchEligibles
              getToken={this.props.getToken}
              fetchEligibles={this.fetchEligibles}
            />
            <EligiblesStackNavigator
              toggleHandler={this.toggleHandler}
              handleSwipeRight={this.handleSwipeRight}
              eligibles={this.state.eligibles}
            />
          </View>
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
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  nestedContainer: {
    flex: 1,
  },
});

export default EligiblesContainer;
