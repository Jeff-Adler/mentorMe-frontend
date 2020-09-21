import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PostList from "../screens/PostList";
import Post from "../screens/Post";

const PostStack = createStackNavigator();

function PostStackNavigator(props) {
  const { posts, fetchHandler, post } = props;
  return (
    <NavigationContainer style={styles.container} independent={true}>
      <PostStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="PostList"
      >
        <PostStack.Screen name="PostList">
          {(props) => (
            <PostList {...props} posts={posts} fetchHandler={fetchHandler} />
          )}
        </PostStack.Screen>
        <PostStack.screen name="Post">
          {(props) => <Post {...props} post={post} />}
        </PostStack.screen>
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
