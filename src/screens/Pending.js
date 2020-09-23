import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-elements";
import UserAvatar from "react-native-user-avatar";

class Pending extends React.Component {
  pressHandler = () => {
    this.props.acceptPending(this.props.pendingUser.id);
    this.props.navigation.pop();
  };

  render() {
    const { pendingUser, acceptPending } = this.props;
    return (
      <View style={styles.container}>
        {pendingUser !== null ? (
          <View style={styles.container}>
            <Text h4>
              {pendingUser.username}
              {"\n"}
            </Text>
            <Text h4>
              {`${pendingUser.first_name} ${pendingUser.last_name}`}
              {"\n"}
            </Text>
            <Text h4>
              {pendingUser.gender}
              {"\n"}
            </Text>
            <Text h4>
              {pendingUser.birthdate}
              {"\n"}
            </Text>
            <UserAvatar
              style={styles.avatar}
              size={50}
              bgColor="#3498db"
              name={`${pendingUser.first_name} ${pendingUser.last_name}`}
            />
            <Text>{"\n"}</Text>
            <Button title="Accept Mentee" onPress={this.pressHandler} />
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
    textAlign: "center",
    width: 50,
    height: 50,
    // marginBottom: 250,
    // paddingHorizontal: 24,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Pending;
