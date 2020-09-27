import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

class Chat extends React.Component {
  state = { messages: [] };

  componentDidMount() {
    this.setState({
      messages: [
        {
          id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{ id: 1 }}
      />
    );
  }
}

export default Chat;
