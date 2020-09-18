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

const Tab = createBottomTabNavigator();

// function DetailsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Details!</Text>
//     </View>
//   );
// }

// const HomeStack = createStackNavigator();

// function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen name="Home" component={HomeScreen} />
//       <HomeStack.Screen name="Details" component={DetailsScreen} />
//     </HomeStack.Navigator>
//   );
// }

// const SettingsStack = createStackNavigator();

// function SettingsStackScreen() {
//   return (
//     <SettingsStack.Navigator>
//       <SettingsStack.Screen name="Settings" component={SettingsScreen} />
//       <SettingsStack.Screen name="Details" component={DetailsScreen} />
//     </SettingsStack.Navigator>
//   );
// }

class App extends React.Component {
  state = {
    user: null,
    signupError: null,
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
          this.setState(
            {
              user: data.user,
            },
            () => console.log("Received user data:", this.state.user)
          );
        } else {
          this.setState(
            {
              signupError: data.error,
            },
            () =>
              console.log("Did NOT receive user data:", this.state.signupError)
          );
        }
      });
  };

  render() {
    return (
      <NavigationContainer>
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "MentorMe", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <MainTabNavigator signupHandler={this.signupHandler} />
      </NavigationContainer>
    );
  }
}

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Header
//         leftComponent={{ icon: "menu", color: "#fff" }}
//         centerComponent={{ text: "MentorMe", style: { color: "#fff" } }}
//         rightComponent={{ icon: "home", color: "#fff" }}
//       />
//       <MainTabNavigator />
//     </NavigationContainer>

// {/* <View style={styles.container}>
//   <Text>MentorMe</Text>
//   <StatusBar style="auto" />
// </View> */}

// <Tab.Navigator
//   screenOptions={({ route }) => ({
//     tabBarIcon: ({ focused, color, size }) => {
//       let iconName;
//       if (route.name === "Home") {
//         iconName = focused
//           ? "ios-information-circle"
//           : "ios-information-circle-outline";
//       } else if (route.name === "Settings") {
//         iconName = focused ? "ios-list-box" : "ios-list";
//       }

//       return <Ionicons name={iconName} size={size} color={color} />;
//     },
//   })}
//   tabBarOptions={{
//     activeTintColor: "tomato",
//     inactiveTintColor: "gray",
//   }}
// >
//   <Tab.Screen name="Home" component={HomeStackScreen} />
//   <Tab.Screen name="Settings" component={SettingsStackScreen} />
// </Tab.Navigator>

// <MainStackNavigator />
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
