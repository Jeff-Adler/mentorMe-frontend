import React from "react";
// import CardStack, { Card } from "react-native-card-stack-swiper";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { Text, ButtonGroup } from "react-native-elements";

import { SafeAreaView, StyleSheet, View } from "react-native";
import UserAvatar from "react-native-user-avatar";

import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;

class EligiblesCardStack extends React.Component {
  state = {
    selectedIndex: 0,
  };

  buttonGroupClickHandler = (selectedIndex) => {
    this.setState({ selectedIndex });
    // this.props.toggleHandler();
  };

  mapEligibles = () => {
    return this.props.eligibles.map((eligible) => {
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
    const buttons = ["Professional", "Interpersonal", "Self"];
    const { selectedIndex } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonGroupContainer}>
          <ButtonGroup
            onPress={this.buttonGroupClickHandler}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{ height: 40 }}
          />
        </View>
        {eligibles !== [] ? (
          <View style={styles.cardContainer}>
            <CardStack
              style={styles.content}
              ref={(swiper) => {
                this.swiper = swiper;
              }}
            >
              {this.mapEligibles()}
            </CardStack>
          </View>
        ) : (
          <SafeAreaView style={styles.container}>
            <Text>Sorry, we can't find anyone!</Text>
          </SafeAreaView>
        )}
      </SafeAreaView>
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
  buttonGroupContainer: {
    marginTop: statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    // marginBottom: 30,
    // marginBottom: -10,
  },
  container: {
    marginTop: statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    // borderRadius: 5,
    // borderWidth: 5,
    // borderColor: "black",
  },
  // cardContainer: {
  //   margin: "7%",
  // },
  content: {
    // justifyContent: "space-around",
    marginTop: "33%",
    // marginBottom: -10,
    flex: 1,
    alignItems: "center",
    // paddingTop: -50,
    // backgroundColor: "#f2f2f2",
    // borderRadius: 5,
    // borderWidth: 5,
    // borderColor: "black",
    // top: 100,
    // width: 320,
    // height: 200,
    // justifyContent: "center",
    // flex: 1,
    // justifyContent: "flex-end",
    // marginBottom: "100%",
    // position: "absolute",
  },
  card: {
    // borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: 320,
    height: 380,
    backgroundColor: "#FE474C",
    borderRadius: 5,
    // borderRadius: 5,
    // borderWidth: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    // marginTop: 50,
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
