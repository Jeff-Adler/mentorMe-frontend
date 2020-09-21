import React from "react";
import { View, Text } from "react-native";

class Pending extends React.Component {
  render() {
    const { pendingUser } = this.props;
    return (
      <View>
        {this.props.pendingUser !== null ? (
          <View>
            <Text>{pendingUser.username}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

export default Pending;
