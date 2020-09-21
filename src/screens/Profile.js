import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

class Profile extends React.Component {
  render() {
    let { logoutHandler } = this.props;
    return (
      <View style={styles.container}>
        <Text>Jeff</Text>
        <Button
          style={styles.button}
          title="Edit"
          onPress={() => this.props.navigation.navigate("ProfileEditForm")}
        />
        <Button
          style={styles.button}
          title="Logout"
          type="clear"
          onPress={() => logoutHandler()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
  },
});

export default Profile;
