// Import necessary dependencies and components
import * as React from "react";
import Login from "../../loginSignup/Login";
import { render, act, fireEvent, waitFor } from "@testing-library/react-native";
import { cleanup } from "@testing-library/react-native";
import fetchMock from "jest-fetch-mock";
import mockNavigation from "../../../__mocks__/mockNavigation.js";
// Mocking @expo/vector-icons for testing
jest.mock("@expo/vector-icons");

// Test suite for the Login component
describe("Login Component", () => {
  // Test to ensure texts render with their designated font families
  it("renders the text with the loaded font", async () => {
    const component = render(<Login />);
    let loginText, subHeaderText;

    // Search for the specified texts within the component
    await act(async () => {
      loginText = await component.findByText("Login");
      subHeaderText = await component.findByText(
        "Hungry or emptying space in the fridge?"
      );
    });

    // Check if the texts have the expected font families
    expect(loginText).toHaveStyle({ fontFamily: "titleFont" });
    expect(subHeaderText).toHaveStyle({ fontFamily: "subHeaderFont" });
  });

  // Test to ensure input states are updated as user types
  it("updates the email and password state when input changes", async () => {
    const { getByPlaceholderText } = render(<Login />);

    // Locate the input fields
    const emailInput = getByPlaceholderText("EMAIL");
    const passwordInput = getByPlaceholderText("PASSWORD");

    await act(async () => {
      // Simulate typing into the input fields
      fireEvent.changeText(emailInput, "test@example.com");
      fireEvent.changeText(passwordInput, "password123");
    });

    // Assert that the input values are as expected
    expect(emailInput.props.value).toBe("test@example.com");
    expect(passwordInput.props.value).toBe("password123");
  });

  // Test to check email validation error message displays
  it("shows email validation error", async () => {
    const { getByPlaceholderText, findByText, getByText } = render(<Login />);

    await act(async () => {
      // Locate the input field and button
      const emailInput = getByPlaceholderText("EMAIL");
      const loginButton = getByText("LOGIN");

      // Simulate typing an incorrect email format and pressing login
      fireEvent.changeText(emailInput, "test");
      fireEvent.press(loginButton);
    });

    // Assert that the email validation error message displays
    const emailError = await findByText("Invalid email");
    expect(emailError).toBeTruthy();
  });

  // Test to check password required error message displays
  it("shows password required error", async () => {
    const { getByPlaceholderText, findByText, getByText } = render(<Login />);

    await act(async () => {
      // Locate the password input field and button
      const passwordInput = getByPlaceholderText("PASSWORD");
      const loginButton = getByText("LOGIN");

      // Simulate leaving the password field empty and pressing login
      fireEvent.changeText(passwordInput, "");
      fireEvent.press(loginButton);
    });

    // Assert that the password required error message displays
    const passwordError = await findByText("Password required");
    expect(passwordError).toBeTruthy();
  });

  it("toggles password visibility when the visibility icon is pressed", async () => {
    const { getByPlaceholderText, getByTestId } = render(<Login />);
    const passwordInput = getByPlaceholderText("PASSWORD");
    const visibilityIcon = getByTestId("password-visibility-icon");

    await act(async () => {
      fireEvent.changeText(passwordInput, "password123");
    });

    // At this point, password is hidden by default
    expect(passwordInput.props.secureTextEntry).toBe(true);

    await act(async () => {
      fireEvent.press(visibilityIcon);
    });

    // After pressing the icon, password should be visible
    expect(passwordInput.props.secureTextEntry).toBe(false);
  });

  // Cleanup after each test to avoid potential side-effects
  afterEach(() => {
    cleanup();
    fetchMock.resetMocks();
  });
});
