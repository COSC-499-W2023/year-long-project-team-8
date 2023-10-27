import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

afterEach(() => {
  fetch.resetMocks();
});
