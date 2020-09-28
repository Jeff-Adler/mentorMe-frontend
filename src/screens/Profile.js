import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, Card } from "react-native-elements";
import UserAvatar from "react-native-user-avatar";
var moment = require("moment");

class Profile extends React.Component {
  capitalize = (gender) => {
    if (typeof gender !== "string") return "";
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };
  convertBirthdateToDate = (birthdate) => {
    const convertedBirthdate = moment(birthdate, "YYYY-MM-DD").format(
      "MMMM Do, YYYY"
    );
    return convertedBirthdate;
  };

  convertBirthdateToAge = (birthdate) => {
    return moment().diff(birthdate, "years");
  };

  render() {
    let { currentUser, logoutHandler } = this.props;
    return (
      <View style={styles.buildContainer}>
        {currentUser.first_name === null ||
        currentUser.last_name === null ||
        currentUser.birthdate === null ||
        currentUser.age === null ||
        currentUser.gender === null ? (
          <View style={styles.buildContainer}>
            <Text h4>You're signed in!{"\n"}</Text>
            <Text h4>Let's fill out your profile.{"\n"}</Text>
            <Button
              style={styles.button}
              title="Create Profile"
              onPress={() => this.props.navigation.navigate("Name")}
            />
          </View>
        ) : (
          <View style={styles.miniContainer}>
            <Card style={styles.miniContainer}>
              <Card.Title
                style={styles.cardTitle}
              >{`${currentUser.first_name} ${currentUser.last_name}`}</Card.Title>
              <Card.Divider />
              {/* <Card.Image source={require("../images/pic2.jpg")} /> */}
              <View style={styles.miniContainer}>
                <UserAvatar
                  style={styles.avatar}
                  size={200}
                  bgColor="#3498db"
                  name={`${currentUser.first_name} ${currentUser.last_name}`}
                  src={currentUser.avatar}
                />
              </View>
              <Text style={styles.italicizedText}>
                {currentUser.description}
                {"\n"}
              </Text>
              <Text style={styles.cardText}>
                <Text style={{ fontWeight: "bold" }}>Gender: </Text>
                {this.capitalize(currentUser.gender)}
                {"         "}
                <Text style={{ fontWeight: "bold" }}>Age: </Text>
                {this.convertBirthdateToAge(currentUser.birthdate)}
                {"\n"}
              </Text>
              {/* <Text style={styles.cardText}>
                <Text style={{ fontWeight: "bold" }}>Username: </Text>
                {pendingUser.username}
                {"\n"}
              </Text> */}
              {/* <Text style={styles.cardText}>
                <Text style={{ fontWeight: "bold" }}>Gender: </Text>
                {this.capitalize(pendingUser.gender)}
                {"\n"}
              </Text> */}
              {/* <Text style={styles.cardText}>
                {this.convertBirthdateToDate(pendingUser.birthdate)}
                {"\n"}
              </Text> */}
              {/* <Text style={styles.cardText}>
                <Text style={{ fontWeight: "bold" }}>Age: </Text>
                {this.convertBirthdateToAge(pendingUser.birthdate)}
                {"\n"}
              </Text> */}
              <Button
                style={styles.button}
                title="Edit Profile"
                onPress={() => this.props.navigation.navigate("Name")}
              />
            </Card>
            {/* <Text style={{ fontWeight: "bold" }} h4>
              {`${currentUser.first_name} ${currentUser.last_name}`}
              {"\n"}
            </Text>
            <Text style={{ fontStyle: "italic" }} h4>
              {currentUser.description}
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
              src={"https://randomuser.me/api/portraits/men/44.jpg"}
            />
            <Text>{"\n"}</Text> */}
          </View>
        )}
        <Button
          style={styles.logoutButton}
          title="Logout"
          type="clear"
          onPress={() => logoutHandler()}
        />
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
    marginTop: "5%",
    marginBottom: "7%",
    // marginLeft: "12%",
  },
  buildContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
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
  },
  italicizedText: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 20,
  },
  logoutButton: {
    marginTop: 12,
    alignItems: "center",
  },
  miniContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
