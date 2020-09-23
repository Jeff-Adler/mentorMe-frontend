import React from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

class Signup extends React.Component {
  state = {
    username: "JeffAdler",
    password: "Blink2002",
  };

  onChangeText = (name) => (text) => this.setState({ [name]: text });

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
          secureTextEntry={true}
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={this.onChangeText("password")}
          value={password}
        />
        <Button
          title="Sign up!"
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

export default Signup;
