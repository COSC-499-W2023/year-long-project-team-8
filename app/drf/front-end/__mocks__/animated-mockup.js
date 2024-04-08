jest.mock("react-native/Libraries/Animated/src/Animated", () => {
  const ActualAnimated = jest.requireActual(
    "react-native/Libraries/Animated/src/Animated"
  );
  return {
    ...ActualAnimated,
    timing: () => {
      return {
        start: (callback) => callback && callback(),
      };
    },
  };
});
