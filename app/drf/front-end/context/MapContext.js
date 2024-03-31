import React, { createContext, useState, useContext } from "react";

export const SliderContext = createContext();

export const useSlider = () => useContext(SliderContext);

export const SliderProvider = ({ children }) => {
  const [sliderValue, setSliderValue] = useState(25);

  return (
    <SliderContext.Provider value={{ sliderValue, setSliderValue }}>
      {children}
    </SliderContext.Provider>
  );
};
