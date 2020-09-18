import React from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

class Signup extends React.Component {
  state = {
    username: "",
    password: "",
  };

  onChangeText = (name) => (text) => this.setState({ [name]: text });

  submitHandler = () => {
    console.log("testing submithandler");
    this.props.signupHandler(this.state);
  };

  render() {
    let { username, password } = this.state;

    return (
      <View style={styles.container}>
        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={this.onChangeText("username")}
          value={username}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={this.onChangeText("password")}
          value={password}
        />
        <Button title="Sign in!" onPress={this.submitHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Signup;
