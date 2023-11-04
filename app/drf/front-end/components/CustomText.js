import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import * as Font from "expo-font";

const CustomText = ({ fontType, style, children, ...rest }) => {
  // State to keep track of whether fonts are loaded
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        titleFont: require("../assets/fonts/Inter-Bold.ttf"),
        subHeaderFont: require("../assets/fonts/Inter-Regular.ttf"),
        textFont: require("../assets/fonts/Inter-Medium.ttf"),
      });
      setFontLoaded(true); // Set state to true when fonts are loaded
    };
    loadFont();
  }, []);

  if (!fontLoaded) {
    return null; // or some placeholder while fonts are loading
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
