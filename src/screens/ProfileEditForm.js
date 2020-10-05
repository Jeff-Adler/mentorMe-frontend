import React from "react";
import { Input, Button } from "react-native-elements";
import { View, StyleSheet } from "react-native";

class ProfileEditForm extends React.Component {
  state = {
    first_name: "",
    last_name: "",
  };

  onChangeText = (name) => (text) => this.setState({ [name]: text });

  pressHandler = () => {
    this.props.submitUserInfo(this.state);
    this.props.navigation.navigate("Gender");
  };

  render() {
    let { firstName, lastName } = this.state;
    return (
      <View style={styles.container}>
        <Input
          placeholder="First Name"
          onChangeText={this.onChangeText("first_name")}
          autoCorrect={false}
          value={firstName}
        />
        <Input
          placeholder="Last Name"
          onChangeText={this.onChangeText("last_name")}
          autoCorrect={false}
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
