import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

class PendingsList extends React.Component {
  mapPendings = () => {
    return this.props.pendings.map((pending) => {
      return (
        <ListItem key={pending.id} bottomDivider>
          <Avatar
            style={styles.avatar}
            source={{ uri: "http://tinygraphs.com/labs/squares/random" }}
          />
          <ListItem.Content>
            <ListItem.Title>{pending.username}</ListItem.Title>
            <ListItem.Subtitle>{pending.id}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      );
    });
  };

  render() {
    return <View>{this.mapPendings()}</View>;
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
});

export default PendingsList;
