import { createStackNavigator } from "@react-navigation/stack";
import PostList from "../screens/PostList";

const Stack = StackNavigator(
  {
    PostList: {
      screen: PostList,
    },
    Post: {
      screen: Post,
    },
  },
  {
    initialRouteName: "List",
  }
);
