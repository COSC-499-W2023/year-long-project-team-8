import React from "react";
import { View, StatusBar } from "react-native";
import Landing from "./components/landing/Landing.js";

const App = () => {
  return (
    <>
      <StatusBar barStyle="default" />
      <View style={{ flex: 1 }}>
        <Landing />
      </View>
    </>
  );
};

export default App;
