import React from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { ListItem, ButtonGroup } from "react-native-elements";
import UserAvatar from "react-native-user-avatar";

class PostList extends React.Component {
  state = {
    selectedIndex: 0,
  };

  buttonGroupClickHandler = (selectedIndex) => {
    this.setState({ selectedIndex });
    this.props.toggleHandler();
  };

  clickHandler = async (post) => {
    await this.props.fetchHandler(post.id);
    this.props.navigation.navigate("Chat");
  };

  mapPosts = () => {
    return this.props.posts.map((post) => {
      const storedPost = post.post;
      const postConnection = post.connection;
      const shownUser =
        this.props.postType === "mentor" ? post.mentee : post.mentor;
      return (
        <ListItem
          onPress={() => this.clickHandler(storedPost)}
          key={storedPost.id}
          bottomDivider
        >
          <UserAvatar
            size={50}
            bgColor="#3498db"
            name={`${shownUser.first_name} ${shownUser.last_name}`}
            src={shownUser.avatar}
          />
          <ListItem.Content>
            <ListItem.Title>
              <Text
                style={{ fontWeight: "bold" }}
              >{`${shownUser.first_name} ${shownUser.last_name}`}</Text>
            </ListItem.Title>
            <ListItem.Subtitle>
              <Text style={{ fontStyle: "italic" }}>
                {postConnection.mentor_type}
              </Text>
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      );
    });
  };

  render() {
    const buttons = ["Mentor", "Mentee"];
    const { selectedIndex } = this.state;
    return (
      <View style={styles.container}>
        {this.props.posts !== null && this.props.posts !== undefined ? (
          <View>
            <ButtonGroup
              onPress={this.buttonGroupClickHandler}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{ height: 40 }}
            />
            <ScrollView>{this.mapPosts()}</ScrollView>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    alignItems: "stretch",
  },
});

export default PostList;
