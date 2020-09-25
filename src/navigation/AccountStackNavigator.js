import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import Profile from "../screens/Profile";
import ProfileEditForm from "../screens/ProfileEditForm";
import { DatePicker } from "../screens/DatePicker";
import GenderPicker from "../screens/GenderPicker";
import ExperiencePicker from "../screens/ExperiencePicker";
import DescriptionForm from "../screens/DescriptionForm";

const Stack = createStackNavigator();

const AccountStackNavigator = (props) => {
  const { currentUser, submitUserInfo, submitBirthdate, logoutHandler } = props;
  return (
    <NavigationContainer style={styles.container} independent={true}>
      <Stack.Navigator style={styles.container} initialRouteName="Profile">
        <Stack.Screen name="Profile">
          {(props) => (
            <Profile
              {...props}
              currentUser={currentUser}
              logoutHandler={logoutHandler}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ProfileEditForm">
          {(props) => (
            <ProfileEditForm {...props} submitUserInfo={submitUserInfo} />
          )}
        </Stack.Screen>
        <Stack.Screen name="GenderPicker">
          {(props) => (
            <GenderPicker {...props} submitUserInfo={submitUserInfo} />
          )}
        </Stack.Screen>
        <Stack.Screen name="DatePicker">
          {(props) => (
            <DatePicker {...props} submitBirthdate={submitBirthdate} />
          )}
        </Stack.Screen>
        <Stack.Screen name="ExperiencePicker">
          {(props) => (
            <ExperiencePicker {...props} submitUserInfo={submitUserInfo} />
          )}
        </Stack.Screen>
        <Stack.Screen name="DescriptionForm">
          {(props) => (
            <DescriptionForm {...props} submitUserInfo={submitUserInfo} />
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
