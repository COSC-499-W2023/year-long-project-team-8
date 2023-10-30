// Import necessary dependencies and components
import * as React from "react";
import Details from "../../loginSignup/Details";
import { render, act, fireEvent, waitFor } from "@testing-library/react-native";
import { cleanup } from "@testing-library/react-native";
// Mocking @expo/vector-icons for testing
jest.mock("@expo/vector-icons");

// Mocking the necessary libraries
jest.mock("expo-font");

describe("<Details />", () => {
  // Mock navigation
  const mockNavigation = {
    navigate: jest.fn(),
  };

  // Test to ensure texts render with their designated font families
  it("renders the text with the loaded font", async () => {
    const component = render(<Details />);
    let detailsText, subHeaderText;

    // Search for the specified texts within the component
    await act(async () => {
      detailsText = await component.findByText("Welcome!");
      subHeaderText = await component.findByText(
        "Add your name and phone number to improve your experience."
      );
    });

    // Check if the texts have the expected font families
    expect(detailsText).toHaveStyle({ fontFamily: "titleFont" });
    expect(subHeaderText).toHaveStyle({ fontFamily: "subHeaderFont" });
  });

  it("validates the input fields correctly when the SAVE button is pressed", async () => {
    const component = render(<Details navigation={mockNavigation} />);
    const saveButton = component.getByText("SAVE");

    const firstNameInput = component.getByPlaceholderText("FIRST NAME");
    const lastNameInput = component.getByPlaceholderText("LAST NAME");
    const phoneInput = component.getByPlaceholderText("+(1) 235 234 8912");

    // Case 1: Submit without any data
    await act(async () => {
      fireEvent.press(saveButton);
    });
    expect(component.queryByText("First name is required")).toBeTruthy();
    expect(component.queryByText("Last name is required")).toBeTruthy();
    expect(component.queryByText("Invalid phone number")).toBeTruthy();

    // Case 2: Enter invalid phone number but provide valid names
    fireEvent.changeText(firstNameInput, "John");
    fireEvent.changeText(lastNameInput, "Doe");
    fireEvent.changeText(phoneInput, "1234"); // Invalid phone number
    await act(async () => {
      fireEvent.press(saveButton);
    });
    expect(component.queryByText("Invalid phone number")).toBeTruthy();

    // Case 3: Provide valid details
    fireEvent.changeText(phoneInput, "+12345678910"); // Assuming this is a valid phone number format
    await act(async () => {
      fireEvent.press(saveButton);
    });
    expect(component.queryByText("First name is required")).toBeNull();
    expect(component.queryByText("Last name is required")).toBeNull();
    expect(component.queryByText("Invalid phone number")).toBeNull();
  });

  // This test verifies that the phone number input is formatted as expected when the user types in it
  it("formats phone number as you type", async () => {
    const component = render(<Details />);
    const phoneInput = component.getByPlaceholderText("+(1) 235 234 8912");

    await act(async () => {
      fireEvent.changeText(phoneInput, "+123456789");
    });

    expect(phoneInput.props.value).toBe("+1 234 567 89");
  });

  // This test checks the navigation logic when valid details are provided, and the SAVE button is pressed
  it("navigates to 'Tabs' when all details are valid and SAVE is pressed", async () => {
    const component = render(<Details navigation={mockNavigation} />);
    const saveButton = component.getByText("SAVE");

    fireEvent.changeText(component.getByPlaceholderText("FIRST NAME"), "John");
    fireEvent.changeText(component.getByPlaceholderText("LAST NAME"), "Doe");
    fireEvent.changeText(
      component.getByPlaceholderText("+(1) 235 234 8912"),
      "+12345678910"
    );

    await act(async () => {
      fireEvent.press(saveButton);
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Tabs");
  });

  // This test ensures that the SKIP button's functionality navigates to 'Tabs' without the need for any user details
  it("navigates to 'Tabs' when SKIP is pressed without saving details", async () => {
    const component = render(<Details navigation={mockNavigation} />);
    const skipButton = component.getByText("SKIP");

    await act(async () => {
      fireEvent.press(skipButton);
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Tabs");
  });

  // Cleanup after each test to avoid potential side-effects
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });
});
