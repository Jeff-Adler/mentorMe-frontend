import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { View, StyleSheet } from "react-native";

class ProfileForm extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    gender: "",
  };

  onChangeText = (name) => (text) => this.setState({ [name]: text });

  render() {
    let { firstName, lastName, gender } = this.state;
    return (
      <View style={styles.container}>
        <Input
          placeholder="firstName"
          //   leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={this.onChangeText("firstName")}
          value={firstName}
        />
        <Input
          placeholder="lastName"
          //   leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={this.onChangeText("lastName")}
          value={lastName}
        />
        <Button
          title="Submit"
          onPress={() => this.props.signupHandler(this.state)}
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
});

export default ProfileForm;
