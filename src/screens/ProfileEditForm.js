import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button, CheckBox } from "react-native-elements";
import { View, StyleSheet } from "react-native";

class ProfileEditForm extends React.Component {
  state = {
    first_name: "",
    last_name: "",
  };

  onChangeText = (name) => (text) => this.setState({ [name]: text });

  pressHandler = () => {
    this.props.submitUserInfo(this.state);
    this.props.navigation.navigate("GenderPicker");
  };

  render() {
    let { firstName, lastName } = this.state;
    return (
      <View style={styles.container}>
        <Input
          placeholder="First Name"
          //   leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={this.onChangeText("first_name")}
          value={firstName}
        />
        <Input
          placeholder="Last Name"
          //   leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={this.onChangeText("last_name")}
          value={lastName}
        />
        <Button title="Next" onPress={this.pressHandler} />
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
