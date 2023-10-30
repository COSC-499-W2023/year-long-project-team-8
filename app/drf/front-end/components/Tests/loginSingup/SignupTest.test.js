import * as React from "react";
import Signup from "../../loginSignup/Signup";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import { cleanup } from "@testing-library/react-native";
import fetchMock from "jest-fetch-mock";
import mockNavigation from "../../../__mocks__/mockNavigation.js";

jest.mock("@expo/vector-icons");

describe("Signup Component", () => {
  // Test to ensure texts render with their designated font families
  it("renders the text with the loaded font", async () => {
    const component = render(<Signup />);
    let loginText, subHeaderText;

    // Search for the specified texts within the component
    await act(async () => {
      loginText = await component.findByText("Sign Up");
      subHeaderText = await component.findByText(
        "Create and account and join the community!"
      );
    });

    // Check if the texts have the expected font families
    expect(loginText).toHaveStyle({ fontFamily: "titleFont" });
    expect(subHeaderText).toHaveStyle({ fontFamily: "subHeaderFont" });
  });

  it("updates the email, password, and confirm password state when input changes", async () => {
    const { getByPlaceholderText } = render(<Signup />);
    const emailInput = getByPlaceholderText("EMAIL");
    const passwordInput = getByPlaceholderText("PASSWORD");
    const confirmPasswordInput = getByPlaceholderText("CONFIRM PASSWORD");

    await act(async () => {
      fireEvent.changeText(emailInput, "test@example.com");
      fireEvent.changeText(passwordInput, "password123");
      fireEvent.changeText(confirmPasswordInput, "password123");
    });

    await waitFor(() => {
      expect(emailInput.props.value).toBe("test@example.com");
      expect(passwordInput.props.value).toBe("password123");
      expect(confirmPasswordInput.props.value).toBe("password123");
    });
  });

  it("shows validation errors for email, password, and confirm password", async () => {
    const { getByPlaceholderText, getByText } = render(<Signup />);
    const emailInput = getByPlaceholderText("EMAIL");
    const passwordInput = getByPlaceholderText("PASSWORD");
    const confirmPasswordInput = getByPlaceholderText("CONFIRM PASSWORD");
    const signupButton = getByText("SIGN UP");

    fireEvent.changeText(emailInput, "invalidemail");
    fireEvent.changeText(passwordInput, "");
    fireEvent.changeText(confirmPasswordInput, "wrongconfirm");
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(getByText("Invalid email")).toBeTruthy();
      expect(getByText("Password required")).toBeTruthy();
      expect(getByText("Passwords do not match")).toBeTruthy();
    });
  });

  it("navigates to Details screen after successful signup", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }), {
      status: 200,
    });

    const { getByPlaceholderText, getByText } = render(
      <Signup navigation={mockNavigation} />
    );
    const emailInput = getByPlaceholderText("EMAIL");
    const passwordInput = getByPlaceholderText("PASSWORD");
    const confirmPasswordInput = getByPlaceholderText("CONFIRM PASSWORD");
    const signupButton = getByText("SIGN UP");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.changeText(confirmPasswordInput, "password123");
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith("Details");
    });
  });

  it("toggles password visibility when the visibility icon is pressed", async () => {
    const { getByPlaceholderText, getByTestId } = render(<Signup />);
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

  afterEach(() => {
    cleanup();
    fetchMock.resetMocks();
  });
});
