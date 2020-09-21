import React from "react";
import { View, Text } from "react-native";

class Pending extends React.Component {
  render() {
    const { route } = this.props;
    const { pending } = route.params;
    // console.log("Props:", this.props);
    console.log("Pending:", pending);
    // console.log("Pending Username:", pending.username);
    return (
      <View>
        <Text>Test</Text>
      </View>
    );
  }
}

export default Pending;
