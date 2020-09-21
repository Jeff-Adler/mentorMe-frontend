import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import ProfileEditForm from "../screens/ProfileEditForm";

const Stack = createStackNavigator();

const AccountStackNavigator = (props) => {
  const { submitUserInfo } = props;
  return (
    <NavigationContainer style={styles.container} independent={true}>
      <Stack.Navigator
        style={styles.container}
        initialRouteName="ProfileEditForm"
      >
        {/* <Stack.Screen name="Account">
          {(props) => <Login {...props}/>}
        </Stack.Screen> */}
        <Stack.Screen name="ProfileEditForm">
          {(props) => (
            <ProfileEditForm {...props} submitUserInfo={submitUserInfo} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AccountStackNavigator;
