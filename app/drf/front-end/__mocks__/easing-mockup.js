jest.mock("react-native/Libraries/Animated/src/Easing", () => ({
  ...jest.requireActual("react-native/Libraries/Animated/src/Easing"),
  bezier: jest.fn(),
}));
