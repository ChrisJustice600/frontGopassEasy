import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DeliveryScreen() {
  return (
    <View style={styles.container}>
      <Text>DeliveryScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f01111",
    alignItems: "center",
    justifyContent: "center",
  },
});
