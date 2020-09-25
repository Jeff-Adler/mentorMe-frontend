import React from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";

class DescriptionForm extends React.Component {
  state = { profession: "", goal: "" };

  onChangeText = (name) => (text) => this.setState({ [name]: text });

  pressHandler = () => {
    const descriptionObj = {
      description: `${this.state.profession} hoping to ${this.state.goal}`,
    };
    this.props.submitUserInfo(descriptionObj);
    this.props.navigation.popToTop();
  };

  render() {
    let { profession, goal } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Input
          placeholder="Profession"
          //   leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={this.onChangeText("profession")}
          value={profession}
        />
        <Input
          placeholder="Goal"
          //   leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={this.onChangeText("goal")}
          value={goal}
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

export default DescriptionForm;
