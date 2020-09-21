import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

class PendingsList extends React.Component {
  clickHandler = (pending) => {
    this.props.fetchHandler(pending.id);
    this.props.navigation.navigate("Pending");
  };

  mapPendings = () => {
    return this.props.pendings.map((pending) => {
      const storedPending = pending;
      return (
        <ListItem
          onPress={() => this.clickHandler(storedPending)}
          key={pending.id}
          bottomDivider
        >
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
    return <View style={styles.container}>{this.mapPendings()}</View>;
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
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PendingsList;
