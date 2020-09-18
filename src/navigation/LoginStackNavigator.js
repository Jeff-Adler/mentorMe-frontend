import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import Signup from "../screens/Signup";
import Login from "../screens/Login";

const Stack = createStackNavigator();

const LoginStackNavigator = (props) => {
  const { loginHandler, signupHandler } = props;
  console.log("loginStackNavigator props:", loginHandler, signupHandler);
  return (
    <Stack.Navigator style={styles.container} initialRouteName="Login">
      <Stack.Screen name="Login">
        {(props) => <Login {...props} loginHandler={loginHandler} />}
      </Stack.Screen>
      <Stack.Screen name="Signup">
        {(props) => <Signup {...props} signupHandler={signupHandler} />}
      </Stack.Screen>
    </Stack.Navigator>
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

export default LoginStackNavigator;
