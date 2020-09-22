import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PendingsList from "../screens/PendingsList";
import Pending from "../screens/Pending";

const PendingsStack = createStackNavigator();

function PendingsStackNavigator(props) {
  const { pendingUsers, pendingUser, acceptPending, fetchHandler } = props;
  return (
    <NavigationContainer style={styles.container} independent={true}>
      <PendingsStack.Navigator initialRouteName="PendingsList">
        <PendingsStack.Screen name="PendingsList">
          {(props) => (
            <PendingsList
              {...props}
              pendingUsers={pendingUsers}
              fetchHandler={fetchHandler}
            />
          )}
        </PendingsStack.Screen>
        <PendingsStack.Screen name="Pending">
          {(props) => (
            <Pending
              {...props}
              pendingUser={pendingUser}
              acceptPending={acceptPending}
            />
          )}
        </PendingsStack.Screen>
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
