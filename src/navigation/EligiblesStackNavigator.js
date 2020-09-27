import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import EligiblesCardStack from "../screens/EligiblesCardStack";

const EligiblesStack = createStackNavigator();

const EligiblesStackNavigator = (props) => {
  const { eligibles, toggleHandler, handleSwipeRight } = props;

  return (
    <EligiblesStack.Navigator
      style={styles.container}
      initialRouteName="Search Mentors"
    >
      <EligiblesStack.Screen name="Search Mentors">
        {(props) => (
          <EligiblesCardStack
            eligibles={eligibles}
            toggleHandler={toggleHandler}
            handleSwipeRight={handleSwipeRight}
          />
        )}
      </EligiblesStack.Screen>
    </EligiblesStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EligiblesStackNavigator;
