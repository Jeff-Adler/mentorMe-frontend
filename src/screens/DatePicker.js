import React, { useState } from "react";
import { View, Platform, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

export const DatePicker = (props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  let { submitBirthdate } = props;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const pressHandler = () => {
    submitBirthdate(date);
    props.navigation.navigate("ExperiencePicker");
  };

  return (
    <View style={styles.container}>
      <DateTimePicker
        id="dateTimePicker"
        value={date}
        mode={mode}
        display="default"
        onChange={onChange}
        maximumDate={new Date()}
      />
      <Button style={styles.button} title="Submit" onPress={pressHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
  },
});
