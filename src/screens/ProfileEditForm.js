import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import { View, StyleSheet } from "react-native";

class ProfileEditForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    gender: "",
  };

  onChangeText = (name) => (text) => this.setState({ [name]: text });

  pressHandler = () => {
    this.props.submitUserInfo(this.state);
    // this.props.navigation.navigate.pop()
  };

  render() {
    let { firstName, lastName, gender } = this.state;
    return (
      <View style={styles.container}>
        <Input
          placeholder="First Name"
          //   leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={this.onChangeText("firstName")}
          value={firstName}
        />
        <Input
          placeholder="Last Name"
          //   leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={this.onChangeText("lastName")}
          value={lastName}
        />
        <Button title="Submit" onPress={this.pressHandler} />
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

export default ProfileEditForm;
