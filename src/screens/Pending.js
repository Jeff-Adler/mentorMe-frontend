import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
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
          <View>
            <Text h4>{pendingUser.username}</Text>
            <Text
              h4
            >{`${pendingUser.first_name} ${pendingUser.last_name}`}</Text>
            <Text h4>{pendingUser.gender}</Text>
            <Text h4>{pendingUser.birthdate}</Text>
            <UserAvatar
              size={50}
              bgColor="#3498db"
              name={`${pendingUser.first_name} ${pendingUser.last_name}`}
            />
            <Button title="Accept Mentee" onPress={this.pressHandler} />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Pending;
