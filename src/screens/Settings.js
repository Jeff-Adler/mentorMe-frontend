import React from "react";
import { Text, View, Button } from "react-native";
import Detail from "./Detail";

function Settings(props) {
  const { navigation } = props;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings </Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Detail")}
      />
    </View>
  );
}

export default Settings;
