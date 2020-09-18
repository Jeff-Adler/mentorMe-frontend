import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import PostList from "../screens/PostList";
import Signup from "../screens/Signup";
import Login from "../screens/Login";

const Tab = createBottomTabNavigator();

const MainTabNavigator = (props) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list-box" : "ios-list";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Login"
        children={() => <Login loginHandler={props.loginHandler} />}
      />
      <Tab.Screen
        name="Signup"
        children={() => <Signup signupHandler={props.signupHandler} />}
      />
      <Tab.Screen name="Posts" component={PostList} />
      {/* <Tab.Screen name="Search" component={SettingsStackScreen} />
      <Tab.Screen name="Pending" component={HomeStackScreen} />
      <Tab.Screen name="Account" component={HomeStackScreen} /> */}
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
