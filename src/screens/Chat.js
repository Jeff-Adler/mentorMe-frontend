import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, Text, StyleSheet } from "react-native";

class Chat extends React.Component {
  state = { messages: null };

  iterateMessageJSON = () => {
    const { messages } = this.props;
    return messages.map((message) => {
      return this.convertMessageJSONToObj(message);
    });
  };

  convertMessageJSONToObj = (message) => {
    return {
      _id: message.id,
      text: message.text,
      createdAt: message.message_created_at,
      user: {
        _id: message.user.id,
        name: `${message.user.first_name} ${message.user.last_name}`,
        avatar: message.user.avatar,
      },
    };
  };

  async componentDidMount() {
    this.setState({ messages: this.iterateMessageJSON() });
  }

  onSend(newMessages = []) {
    const postId = this.props.messages[0].id;
    console.log("Sent Message: ", newMessages, "PostId: ", postId);
    this.props.messageHandler(newMessages, postId);
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, newMessages),
    }));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.messages !== null ? (
          <GiftedChat
            messages={this.state.messages}
            onSend={(messages) => this.onSend(messages)}
            user={{ _id: this.props.currentUser.id }}
          />
        ) : (
          <Text>Test</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
});

export default Chat;
