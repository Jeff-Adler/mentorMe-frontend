import React from "react";
import { StyleSheet } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import EligiblesCardStack from "../screens/EligiblesCardStack";

const EligiblesStack = createStackNavigator();

const EligiblesStackNavigator = (props) => {
  const { eligibles, toggleHandler, handleSwipeRight } = props;

  return (
    // <NavigationContainer style={styles.container} independent={true}>
    <EligiblesStack.Navigator
      style={styles.container}
      initialRouteName="Search Mentors"
    >
      <EligiblesStack.Screen name="Search Mentors">
        {(props) => (
          <EligiblesCardStack
            // {...props}
            eligibles={eligibles}
            toggleHandler={toggleHandler}
            handleSwipeRight={handleSwipeRight}
          />
        )}
      </EligiblesStack.Screen>
    </EligiblesStack.Navigator>
    // </NavigationContainer>
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
