import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-elements";
import UserAvatar from "react-native-user-avatar";
var moment = require("moment");

class Pending extends React.Component {
  pressHandler = () => {
    this.props.acceptPending(this.props.pendingUser.id);
    this.props.navigation.pop();
  };

  capitalize = (gender) => {
    if (typeof gender !== "string") return "";
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  convertBirthdateToAge = (birthdate) => {
    return moment().diff(birthdate, "years");
  };

  render() {
    const { pendingUser } = this.props;
    return (
      <View style={styles.container}>
        {pendingUser !== null ? (
          <View style={styles.container}>
            <Card style={styles.miniContainer}>
              <Card.Title
                style={styles.cardTitle}
              >{`${pendingUser.first_name} ${pendingUser.last_name}`}</Card.Title>
              <Card.Divider />
              <View style={styles.miniContainer}>
                <UserAvatar
                  key={pendingUser.avatar}
                  style={styles.avatar}
                  size={200}
                  bgColor="#3498db"
                  name={`${pendingUser.first_name} ${pendingUser.last_name}`}
                  src={pendingUser.avatar}
                />
              </View>
              <Text style={styles.italicizedText}>
                {pendingUser.description}
                {"\n"}
              </Text>
              <Text style={styles.cardText}>
                <Text style={{ fontWeight: "bold" }}>Gender: </Text>
                {this.capitalize(pendingUser.gender)}
                {"         "}
                <Text style={{ fontWeight: "bold" }}>Age: </Text>
                {this.convertBirthdateToAge(pendingUser.birthdate)}
                {"\n"}
              </Text>
              <Button
                onPress={this.pressHandler}
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="Accept Mentee"
              />
            </Card>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
  },
  cardText: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
  },
  cardTitle: {
    fontSize: 20,
  },
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2%",
    marginBottom: "3.8%",
  },
  italicizedText: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 20,
  },
  miniContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 277,
  },
});

export default Pending;
