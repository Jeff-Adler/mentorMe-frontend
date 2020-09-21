import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import UserAvatar from "react-native-user-avatar";

class Profile extends React.Component {
  render() {
    let { currentUser, logoutHandler } = this.props;
    return (
      <View style={styles.container}>
        <Text h4>
          {`${currentUser.first_name} ${currentUser.last_name}`}
          {"\n"}
        </Text>
        <Text h4>
          {currentUser.gender}
          {"\n"}
        </Text>
        <Text h4>
          {currentUser.birthdate}
          {"\n"}
        </Text>
        <UserAvatar
          size={50}
          bgColor="#3498db"
          name={`${currentUser.first_name} ${currentUser.last_name}`}
        />
        <Text>{"\n"}</Text>
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
    alignItems: "center",
  },
  button: {
    alignItems: "center",
  },
});

export default Profile;
