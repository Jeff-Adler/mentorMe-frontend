import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PostList from "../screens/PostList";
import Chat from "../screens/Chat";

const PostStack = createStackNavigator();

function PostStackNavigator(props) {
  const {
    posts,
    postType,
    toggleHandler,
    fetchHandler,
    messages,
    currentUser,
    messageHandler,
  } = props;
  return (
    <NavigationContainer style={styles.container} independent={true}>
      <PostStack.Navigator initialRouteName="Chats">
        <PostStack.Screen name="Chats">
          {(props) => (
            <PostList
              {...props}
              posts={posts}
              postType={postType}
              toggleHandler={toggleHandler}
              fetchHandler={fetchHandler}
            />
          )}
        </PostStack.Screen>
        <PostStack.Screen name="Chat">
          {(props) => (
            <Chat
              {...props}
              currentUser={currentUser}
              messageHandler={messageHandler}
              messages={messages}
            />
          )}
        </PostStack.Screen>
      </PostStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostStackNavigator;
