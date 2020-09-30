import React from "react";

import CardStack from "react-native-card-stack-swiper";
import { Text, ButtonGroup, Card } from "react-native-elements";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveScreenHeight,
} from "react-native-responsive-dimensions";

import { SafeAreaView, StyleSheet, View } from "react-native";
import UserAvatar from "react-native-user-avatar";

import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;
var moment = require("moment");

class EligiblesCardStack extends React.Component {
  state = {
    selectedIndex: 0,
  };

  buttonGroupClickHandler = (selectedIndex) => {
    this.setState({ selectedIndex });
    this.props.toggleHandler(selectedIndex);
  };

  capitalize = (gender) => {
    if (typeof gender !== "string") return "";
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  convertBirthdateToAge = (birthdate) => {
    return moment().diff(birthdate, "years");
  };

  convertBirthdateToDate = (birthdate) => {
    const convertedBirthdate = moment(birthdate, "YYYY-MM-DD").format(
      "MMMM Do, YYYY"
    );
    return convertedBirthdate;
  };

  mapEligibles = () => {
    return this.props.eligibles.map((eligible) => {
      return (
        <Card
          key={eligible.id}
          style={[styles.card, styles.card1]}
          onSwipedRight={() => this.props.handleSwipeRight(eligible.id)}
        >
          <Card.Title
            style={styles.cardTitle}
          >{`${eligible.first_name} ${eligible.last_name}`}</Card.Title>
          <Card.Divider />
          <View style={styles.miniContainer}>
            <UserAvatar
              style={styles.avatar}
              size={200}
              bgColor="#3498db"
              name={`${eligible.first_name} ${eligible.last_name}`}
              src={eligible.avatar}
            />
          </View>
          <Text style={styles.italicizedText}>
            {eligible.description}
            {"\n"}
          </Text>
          <Text style={styles.cardText}>
            <Text style={{ fontWeight: "bold" }}>Gender: </Text>
            {this.capitalize(eligible.gender)}
            {"         "}
            <Text style={{ fontWeight: "bold" }}>Age: </Text>
            {this.convertBirthdateToAge(eligible.birthdate)}
            {"\n"}
          </Text>
        </Card>
      );
    });
  };

  render() {
    const { eligibles } = this.props;
    const buttons = ["Professional", "Interpersonal", "Self"];
    const { selectedIndex } = this.state;
    return (
      <SafeAreaView>
        <View style={styles.buttonGroupContainer}>
          <ButtonGroup
            onPress={this.buttonGroupClickHandler}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{ height: 40 }}
          />
        </View>
        {eligibles !== [] ? (
          <View style={styles.container}>
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
    width: 200,
    height: 200,
    marginTop: "5%",
    marginBottom: "7%",
  },
  buttonGroupContainer: {
    marginTop: "8%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  cardContainer: {
    marginTop: "5%",
    // justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    // borderRadius: 5,
    // borderWidth: 5,
    // borderColor: "black",
  },
  cardTitle: {
    fontSize: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
  },
  content: {
    // justifyContent: "space-around",
    marginTop: "10%",
    // marginBottom: -10,
    flex: 1,
    alignItems: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 320,
    height: 455,
    backgroundColor: "#FE474C",
    borderRadius: 5,
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
  cardText: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
  },
  italicizedText: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 20,
    alignSelf: "center",
  },
  label: {
    marginTop: 75,
    lineHeight: 450,
    textAlign: "center",
    fontSize: 45,
    fontFamily: "System",
    color: "black",
    backgroundColor: "transparent",
  },
  miniContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: responsiveScreenHeight(40.5),
    width: responsiveWidth(83),
    // marginBottom: 100,
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
