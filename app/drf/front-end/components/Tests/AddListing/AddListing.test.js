import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddListing from "../../addListing/AddListing";

describe("<AddListing />", () => {
  // Test case for checking the initial rendering of the component.
  it("renders correctly with initial state", async () => {
    let getByText;
    await act(async () => {
      const rendered = render(<AddListing />);
      getByText = rendered.getByText;
    });

    expect(getByText("Choose Categories")).toBeTruthy();
    expect(getByText("Add Allergens")).toBeTruthy();
  });

  // Test case for checking the opening and closing of the category modal.
  it("opens and closes category modal correctly", () => {
    const { getByText, getByTestId, queryByTestId } = render(<AddListing />);

    fireEvent.press(getByText("Choose Categories"));
    expect(getByTestId("categoryModal")).toBeTruthy(); // Check if the modal is open

    fireEvent.press(getByTestId("closeModalButton")); // Close the modal
    expect(queryByTestId("categoryModal")).toBeNull(); // Check if the modal is closed
  });
});
