import React from "react";
import { Button } from "react-native-elements";

class PostPicker extends React.Component {
  menteePressHandler = () => {
    this.props.navigation.navigate("Mentee Post List");
  };

  mentorPressHandler = () => {
    this.props.navigation.navigate("Mentor Post List");
  };

  render() {
    return (
      <View>
        <Button title="Mentee" onPress={this.menteePressHandler} />
        <Button title="Mentor" onPress={this.mentorPressHandler} />
      </View>
    );
  }
}

export default PostPicker;
