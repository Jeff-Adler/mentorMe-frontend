import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import Profile from "../screens/Profile";
import ProfileEditForm from "../screens/ProfileEditForm";
import { DatePicker } from "../screens/DatePicker";

const Stack = createStackNavigator();

const AccountStackNavigator = (props) => {
  const { submitUserInfo, submitBirthdate, logoutHandler } = props;
  return (
    <NavigationContainer style={styles.container} independent={true}>
      <Stack.Navigator style={styles.container} initialRouteName="Profile">
        <Stack.Screen name="Profile">
          {(props) => <Profile {...props} logoutHandler={logoutHandler} />}
        </Stack.Screen>
        <Stack.Screen name="ProfileEditForm">
          {(props) => (
            <ProfileEditForm {...props} submitUserInfo={submitUserInfo} />
          )}
        </Stack.Screen>
        <Stack.Screen name="DatePicker">
          {(props) => (
            <DatePicker {...props} submitBirthdate={submitBirthdate} />
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
