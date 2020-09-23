import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import PostContainer from "../containers/PostContainer";
import EligiblesContainer from "../containers/EligiblesContainer";
import PendingContainer from "../containers/PendingContainer";
import AccountStackNavigator from "../navigation/AccountStackNavigator";

const Tab = createBottomTabNavigator();

const MainTabNavigator = (props) => {
  const {
    submitUserInfo,
    logoutHandler,
    currentUser,
    submitBirthdate,
    getToken,
  } = props;
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Chats") {
            iconName = focused ? "comments" : "comments";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search";
          } else if (route.name === "Pending") {
            iconName = focused ? "list-ul" : "list-ul";
          } else if (route.name === "Account") {
            iconName = focused ? "user-alt" : "user";
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Chats"
        children={() => (
          <PostContainer currentUser={currentUser} getToken={getToken} />
        )}
      />
      <Tab.Screen
        name="Search"
        children={() => (
          <EligiblesContainer currentUser={currentUser} getToken={getToken} />
        )}
      />
      <Tab.Screen
        name="Pending"
        children={() => (
          <PendingContainer currentUser={currentUser} getToken={getToken} />
        )}
      />
      <Tab.Screen
        name="Account"
        children={() => (
          <AccountStackNavigator
            currentUser={currentUser}
            submitUserInfo={submitUserInfo}
            submitBirthdate={submitBirthdate}
            logoutHandler={logoutHandler}
          />
        )}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
