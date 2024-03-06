
import fetchMock from "jest-fetch-mock";
import '@react-native-async-storage/async-storage/jest/async-storage-mock';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('expo-font');
jest.mock('expo-asset');

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

fetchMock.enableMocks();

afterEach(() => {
  fetch.resetMocks();
});

jest.mock("@expo/vector-icons");
