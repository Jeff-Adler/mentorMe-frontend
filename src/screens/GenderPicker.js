import React from "react";
import { View, StyleSheet } from "react-native";
import { CheckBox, Button } from "react-native-elements";

class GenderPicker extends React.Component {
  state = { gender: null };

  malePressHandler = () => {
    this.setState({ gender: "male" });
  };

  femalePressHandler = () => {
    this.setState({ gender: "female" });
  };

  otherPressHandler = () => {
    this.setState({ gender: "other" });
  };

  submitHandler = () => {
    this.props.submitUserInfo(this.state);
    this.props.navigation.navigate("Birthdate");
  };

  render() {
    return (
      <View style={styles.container}>
        <CheckBox
          center
          title="Male"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={this.state.gender === "male"}
          value="male"
          onPress={this.malePressHandler}
        />
        <CheckBox
          center
          title="Female"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={this.state.gender === "female"}
          value="female"
          onPress={this.femalePressHandler}
        />
        <CheckBox
          center
          title="Other"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={this.state.gender === "other"}
          value="other"
          onPress={this.otherPressHandler}
        />
        <Button
          style={styles.button}
          title="Next"
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

export default GenderPicker;
