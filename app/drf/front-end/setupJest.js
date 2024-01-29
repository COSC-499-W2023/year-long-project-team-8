// app/drf/front-end/mocks/setupJest.js

import '@react-native-async-storage/async-storage/jest/async-storage-mock';
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

afterEach(() => {
  fetch.resetMocks();
});

jest.mock("@expo/vector-icons");
