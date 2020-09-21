import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import UserAvatar from "react-native-user-avatar";

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
          <UserAvatar
            size={50}
            bgColor="#3498db"
            name={`${pending.first_name} ${pending.last_name}`}
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
    return (
      <View style={styles.container}>
        {this.props.pendings !== null ? this.mapPendings() : null}
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
    // justifyContent: "center",
    alignItems: "stretch",
  },
});

export default PendingsList;
