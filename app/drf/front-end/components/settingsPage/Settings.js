//Dummy settings display

import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SettingsPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SettingsPage;
