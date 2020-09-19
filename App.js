import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Header } from "react-native-elements";
// import BottomTabs from "./src/navigations/bottomTabs";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import MainStackNavigator from "./src/navigation/MainStackNavigator";

import HomeScreen from "./src/screens/Home";
import SettingsScreen from "./src/screens/Settings";

import MainTabNavigator from "./src/navigation/MainTabNavigator";
import LoginStackNavigator from "./src/navigation/LoginStackNavigator";

import AsyncStorage from "@react-native-community/async-storage";

const Tab = createBottomTabNavigator();

class App extends React.Component {
  state = {
    user: null,
    isSignedIn: false,
    signupError: null,
    authenticationError: null,
  };

  getUserId = () => {
    return this.state.user.id;
  };

  async storeToken(jwt) {
    try {
      await AsyncStorage.setItem("token", jwt);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  getTokenNotAsync() {
    return AsyncStorage.getItem("token");
  }

  async getToken() {
    try {
      let token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {}
  }

  retrieveUserProfile = (token) => {
    fetch("http://localhost:3000/api/v1/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.setState({ user: data.user });
        }
      });
  };

  submitBirthdate = async (dateObj) => {
    const dateString = JSON.stringify(dateObj);
    const birthdate = dateString.slice(1, dateString.indexOf("T"));

    const token = await this.getTokenNotAsync();

    console.log(token);

    const configObj = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: { birthdate: birthdate } }),
    };

    fetch(`http://localhost:3000/api/v1/users/${this.getUserId()}`, configObj)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.setState({ user: data.user }, () =>
            console.log(this.state.user)
          );
        }
      });
  };

  loginHandler = (userInfo) => {
    const configObj = {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: userInfo }),
    };

    fetch("http://localhost:3000/api/v1/login", configObj)
      .then((response) => response.json())
      .then((data) => {
        if (data.jwt) {
          this.storeToken(data.jwt);
          this.setState({ user: data.user, isSignedIn: true });
        } else {
          this.setState({ authenticationError: data.message });
        }
      });
  };

  signupHandler = (userObj) => {
    const configObj = {
      method: "POST",
      headers: {
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: userObj }),
    };

    fetch("http://localhost:3000/api/v1/users", configObj)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.jwt) {
          this.setState({
            user: data.user,
          });
        } else {
          this.setState({
            signupError: data.error,
          });
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.isSignedIn === true ? (
          <View style={styles.container}>
            <Header
              leftComponent={{ icon: "menu", color: "#fff" }}
              centerComponent={{ text: "MentorMe", style: { color: "#fff" } }}
              rightComponent={{ icon: "home", color: "#fff" }}
            />
            <NavigationContainer>
              <MainTabNavigator
                getToken={this.getToken}
                submitBirthdate={this.submitBirthdate}
                loginHandler={this.loginHandler}
                signupHandler={this.signupHandler}
              />
            </NavigationContainer>
          </View>
        ) : (
          <View style={styles.container}>
            <NavigationContainer style={styles.container}>
              <LoginStackNavigator
                style={styles.container}
                loginHandler={this.loginHandler}
                signupHandler={this.signupHandler}
              />
            </NavigationContainer>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default App;
