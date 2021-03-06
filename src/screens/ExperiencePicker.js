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
    this.setState({ professional: !this.state.professional });
  };

  interpersonalPressHandler = () => {
    this.setState({ interpersonal: !this.state.interpersonal });
  };

  selfImprovementPressHandler = () => {
    this.setState({ self_improvement: !this.state.self_improvement });
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
          title="Career"
          checked={this.state.professional === true}
          value="professional"
          onPress={this.professionalPressHandler}
        />
        <CheckBox
          center
          title="Relationships"
          checked={this.state.interpersonal === true}
          value="interpersonal"
          onPress={this.interpersonalPressHandler}
        />
        <CheckBox
          center
          title="Self-esteem"
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
