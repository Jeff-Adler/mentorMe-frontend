import React from "react";
import { View, Text } from "react-native";

class Pending extends React.Component {
  render() {
    {
      this.props.pendingUser !== null
        ? console.log("user:", this.props.pendingUser.user)
        : null;
    }
    {
      this.props.pendingUser !== null
        ? console.log("user:", this.props.pendingUser.user.username)
        : null;
    }
    return (
      <View>
        {this.props.pendingUser !== null ? (
          <View>
            <Text>{this.props.pendingUser.user.username}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

export default Pending;
