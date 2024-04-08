import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";

// Flag to indicate whether fonts have been loaded
let fontsLoaded = false;

const CustomText = ({ fontType, style, children, ...rest }) => {
  // State to trigger re-render once fonts are loaded
  const [fontsAreLoaded, setFontsAreLoaded] = useState(fontsLoaded);

  useEffect(() => {
    if (!fontsLoaded) {
      const loadFont = async () => {
        await Font.loadAsync({
          titleFont: require("../assets/fonts/Inter-Bold.ttf"),
          subHeaderFont: require("../assets/fonts/Inter-Regular.ttf"),
          textFont: require("../assets/fonts/Inter-Medium.ttf"),
        });
        fontsLoaded = true; // Set global flag to true when fonts are loaded
        setFontsAreLoaded(true); // Trigger re-render
      };
      loadFont();
    }
  }, []);

  if (!fontsAreLoaded) {
    return null; // Return null while fonts are loading
  }

  // Determine the font family based on the fontType prop
  let fontFamily;
  switch (fontType) {
    case "title":
      fontFamily = "titleFont";
      break;
    case "subHeader":
      fontFamily = "subHeaderFont";
      break;
    case "text":
    default:
      fontFamily = "textFont";
      break;
  }

  // Combine the custom font with the style prop passed to the component
  const combinedStyles = [{ fontFamily }, style];

  return (
    <Text {...rest} style={combinedStyles}>
      {children}
    </Text>
  );
};

export default CustomText;
