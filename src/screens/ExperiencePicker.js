import React from "react";
import { View, StyleSheet } from "react-native";
import { CheckBox, Button, Text } from "react-native-elements";

class ExperiencePicker extends React.Component {
  state = {
    professional: false,
    interpersonal: false,
    self_improvement: false,
  };

  professionalPressHandler = () => {
    this.setState({ professional: true });
  };

  interpersonalPressHandler = () => {
    this.setState({ interpersonal: true });
  };

  selfImprovementPressHandler = () => {
    this.setState({ self_improvement: true });
  };

  submitHandler = () => {
    this.props.submitUserInfo(this.state);
    this.props.navigation.navigate("Tagline");
  };

  render() {
    return (
      <View style={styles.container}>
        <CheckBox
          center
          title="Professional"
          checked={this.state.professional === true}
          value="professional"
          onPress={this.professionalPressHandler}
        />
        <CheckBox
          center
          title="Interpersonal"
          checked={this.state.interpersonal === true}
          value="interpersonal"
          onPress={this.interpersonalPressHandler}
        />
        <CheckBox
          center
          title="Self-Improvement"
          checked={this.state.self_improvement === true}
          value="self-improvement"
          onPress={this.selfImprovementPressHandler}
        />
        <Button
          style={styles.button}
          title="Submit"
          onPress={this.submitHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  button: {
    alignItems: "center",
    // backgroundColor: "#fff",
  },
});

export default ExperiencePicker;
