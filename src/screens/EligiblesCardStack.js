import React from "react";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { StyleSheet, Text, View } from "react-native";
import UserAvatar from "react-native-user-avatar";

class EligiblesCardStack extends React.Component {
  mapEligibles = () => {
    return this.props.eligibles.map((eligible, index) => {
      const evenOddBoolean = index % 2 === 0;
      return (
        <Card
          key={eligible.id}
          style={[styles.card, styles.card1]}
          onSwipedRight={() => this.props.handleSwipeRight(eligible.id)}
        >
          <Text
            style={styles.label}
          >{`${eligible.first_name} ${eligible.last_name}`}</Text>
          <UserAvatar
            style={styles.avatar}
            size={100}
            bgColor="#3498db"
            name={`${eligible.first_name} ${eligible.last_name}`}
          />
        </Card>
      );
    });
  };

  render() {
    const { eligibles } = this.props;
    return (
      <View style={styles.container}>
        {this.props.eligibles !== [] ? (
          <CardStack
            style={styles.content}
            ref={(swiper) => {
              this.swiper = swiper;
            }}
          >
            {this.mapEligibles()}
          </CardStack>
        ) : (
          <Text>Sorry, we can't find anyone!</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    // width: 50,
    marginBottom: 250,
    // paddingHorizontal: 24,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
  },
  content: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // flex: 1,
    // justifyContent: "flex-end",
    // marginBottom: 36,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 320,
    height: 470,
    backgroundColor: "#FE474C",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    marginTop: 50,
  },
  card1: {
    backgroundColor: "white",
  },
  card2: {
    backgroundColor: "#FEB12C",
  },
  label: {
    marginTop: 75,
    lineHeight: 400,
    textAlign: "center",
    fontSize: 45,
    fontFamily: "System",
    color: "black",
    backgroundColor: "transparent",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 220,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  orange: {
    width: 55,
    height: 55,
    borderWidth: 6,
    borderColor: "rgb(246,190,66)",
    borderRadius: 55,
    marginTop: -15,
  },
  green: {
    width: 75,
    height: 75,
    backgroundColor: "#fff",
    borderRadius: 75,
    borderWidth: 6,
    borderColor: "#01df8a",
  },
  red: {
    width: 75,
    height: 75,
    backgroundColor: "#fff",
    borderRadius: 75,
    borderWidth: 6,
    borderColor: "#fd267d",
  },
});

export default EligiblesCardStack;
