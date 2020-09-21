import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PendingContainer from "../containers/PendingContainer";

import PendingsList from "../screens/PendingsList";
import Pending from "../screens/Pending";

const PendingsStack = createStackNavigator();

function PendingsStackNavigator(props) {
  const { pendings } = props;
  return (
    <NavigationContainer style={styles.container} independent={true}>
      <PendingsStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="PendingsList"
      >
        <PendingsStack.Screen name="PendingsList">
          {(props) => <PendingsList {...props} pendings={pendings} />}
        </PendingsStack.Screen>
        <PendingsStack.Screen name="Pending" component={Pending} />
      </PendingsStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PendingsStackNavigator;
