import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

class PendingsList extends React.Component {
  // This method triggers PendingContainer to fetch individual pending show page
  showPending = (pending) => {
    // pending.persist();
    // console.log("Pendinglist Pending:", pending);
    // this.props.navigation.navigate("Pending", { pending: pending });
  };

  mapPendings = () => {
    return this.props.pendings.map((pending, index) => {
      const savedPending = this.props.pendings[index];
      return (
        <ListItem
          onPress={(savedPending) => this.showPending(savedPending)}
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
