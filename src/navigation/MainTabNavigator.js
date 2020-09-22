import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import PostContainer from "../containers/PostContainer";
import { DatePicker } from "../screens/DatePicker";
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
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Search") {
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
