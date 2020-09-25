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
            <Card style={styles.miniContainer}>
              <Card.Title>{`${pendingUser.first_name} ${pendingUser.last_name}`}</Card.Title>
              <Card.Divider />
              {/* <Card.Image source={require("../images/pic2.jpg")} /> */}
              <Text style={styles.cardText}>
                {pendingUser.username}
                {"\n"}
              </Text>
              <Text style={styles.cardText}>
                {pendingUser.gender}
                {"\n"}
              </Text>
              <Text style={styles.cardText}>
                {pendingUser.birthdate}
                {"\n"}
              </Text>
              <UserAvatar
                style={styles.avatar}
                size={50}
                bgColor="#3498db"
                name={`${pendingUser.first_name} ${pendingUser.last_name}`}
                src={pendingUser.avatar}
              />
              <Text>{"\n"}</Text>
              <Button
                onPress={this.pressHandler}
                // icon={<Icon name="code" color="#ffffff" />}
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
    // textAlign: "center",
    width: 50,
    height: 50,
    // marginBottom: 250,
    // paddingHorizontal: 24,
    marginLeft: "35%",
  },
  cardText: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  miniContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Pending;
