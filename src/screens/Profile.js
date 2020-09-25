import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import UserAvatar from "react-native-user-avatar";
var moment = require("moment");

class Profile extends React.Component {
  convertBirthdateToDate = (birthdate) => {
    console.log(birthdate);
    const convertedBirthdate = moment(birthdate, "YYYY-MM-DD").format(
      "MMMM Do, YYYY"
    );
    return convertedBirthdate;
  };

  render() {
    let { currentUser, logoutHandler } = this.props;
    return (
      <View style={styles.container}>
        {currentUser.first_name === null ||
        currentUser.last_name === null ||
        currentUser.birthdate === null ||
        currentUser.age === null ||
        currentUser.gender === null ? (
          <View style={styles.miniContainer}>
            <Text h4>You're signed in!{"\n"}</Text>
            <Text h4>Let's fill out your profile.{"\n"}</Text>
          </View>
        ) : (
          <View style={styles.miniContainer}>
            <Text h4>
              {`${currentUser.first_name} ${currentUser.last_name}`}
              {"\n"}
            </Text>
            <Text h4>
              {currentUser.gender.charAt(0).toUpperCase() +
                currentUser.gender.slice(1)}
              {"\n"}
            </Text>
            <Text h4>
              {this.convertBirthdateToDate(currentUser.birthdate)}
              {"\n"}
            </Text>
            <Text h4>{currentUser.karma}</Text>
            <UserAvatar
              size={100}
              bgColor="#3498db"
              name={`${currentUser.first_name} ${currentUser.last_name}`}
              src={"https://randomuser.me/api/portraits/men/39.jpg"}
            />
            <Text>{"\n"}</Text>
          </View>
        )}
        <Button
          style={styles.button}
          title="Edit Profile"
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
  miniContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
