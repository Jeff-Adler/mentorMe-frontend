import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MainTabNavigator from "./src/navigation/MainTabNavigator";
import LoginStackNavigator from "./src/navigation/LoginStackNavigator";
import AccountStackNavigator from "./src/navigation/AccountStackNavigator";

import AsyncStorage from "@react-native-community/async-storage";

// import Constants from "expo-constants";
// const statusBarHeight = Constants.statusBarHeight;

const Tab = createBottomTabNavigator();

class App extends React.Component {
  state = {
    user: null,
    isSignedIn: false,
    signupError: null,
    authenticationError: null,
  };

  async componentDidMount() {
    const token = await this.getToken();
    if (token) {
      this.retrieveUserProfile(token);
    }
  }

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

  getToken() {
    return AsyncStorage.getItem("token");
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
        if (!data.error) {
          this.setState({ user: data.user, isSignedIn: true });
        }
      });
  };

  submitUserInfo = async (userInfo) => {
    const token = await this.getToken();
    const configObj = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        accepts: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ user: userInfo }),
    };

    fetch(`http://localhost:3000/api/v1/users/${this.getUserId()}`, configObj)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.setState({ user: data.user }, () =>
            console.log("Updated user:", this.state.user)
          );
        }
      });
  };

  submitBirthdate = async (dateObj) => {
    const dateString = JSON.stringify(dateObj);
    const birthdate = dateString.slice(1, dateString.indexOf("T"));

    const token = await this.getToken();

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
          this.setState({ user: data.user });
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
        if (data.jwt) {
          this.setState(
            {
              user: data.user,
            },
            () => {
              this.loginHandler(userObj);
            }
          );
        } else {
          this.setState({
            signupError: data.error,
          });
        }
      });
  };

  logoutHandler = async () => {
    try {
      await AsyncStorage.removeItem("token");
      this.setState({ isSignedIn: false });
    } catch (exception) {
      console.log("Couldn't logout");
    }
  };

  render() {
    const { user } = this.state;
    console.log("User:", this.state.user);
    return (
      <View style={styles.container}>
        {this.state.isSignedIn === true ? (
          <View style={styles.container}>
            {user.first_name === null ||
            user.last_name === null ||
            user.birthdate === null ||
            user.age === null ||
            user.gender === null ||
            user.description === null ||
            user.professional === null ||
            user.self_improvement === null ||
            user.interpersonal === null ? (
              <AccountStackNavigator
                currentUser={user}
                submitUserInfo={this.submitUserInfo}
                submitBirthdate={this.submitBirthdate}
                logoutHandler={this.logoutHandler}
              />
            ) : (
              <View style={styles.container}>
                {/* <Header
              leftComponent={{ icon: "menu", color: "#fff" }}
              centerComponent={{ text: "MentorMe", style: { color: "#fff" } }}
              rightComponent={{ icon: "home", color: "#fff" }}
            /> */}
                <NavigationContainer>
                  <MainTabNavigator
                    currentUser={this.state.user}
                    getToken={this.getToken}
                    submitUserInfo={this.submitUserInfo}
                    submitBirthdate={this.submitBirthdate}
                    logoutHandler={this.logoutHandler}
                  />
                </NavigationContainer>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.container}>
            <NavigationContainer style={styles.container}>
              <LoginStackNavigator
                style={styles.container}
                loginHandler={this.loginHandler}
                signupHandler={this.signupHandler}
                submitUserInfo={this.submitUserInfo}
                submitBirthdate={this.submitBirthdate}
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
    // marginTop: statusBarHeight,
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default App;
