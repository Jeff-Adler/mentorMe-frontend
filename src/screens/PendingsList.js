import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import UserAvatar from "react-native-user-avatar";

class PendingsList extends React.Component {
  clickHandler = (pending) => {
    this.props.fetchHandler(pending.id);
    this.props.navigation.navigate("Pending Mentee");
  };

  mapPendings = () => {
    return this.props.pendingUsers.map((pending, index) => {
      const storedPending = pending;
      return (
        <ListItem
          onPress={() => this.clickHandler(storedPending)}
          key={index}
          bottomDivider
        >
          <UserAvatar
            size={50}
            bgColor="#3498db"
            name={`${pending.first_name} ${pending.last_name}`}
            src={pending.avatar}
          />
          <ListItem.Content>
            <ListItem.Title>{`${pending.first_name} ${pending.last_name}`}</ListItem.Title>
            <ListItem.Subtitle>{pending.birthdate}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      );
    });
  };

  render() {
    return (
      // <View style={styles.container}>
      <ScrollView>
        {this.props.pendingUsers !== null ? this.mapPendings() : null}
      </ScrollView>
      // {/* </View> */}
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
