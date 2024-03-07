import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../../loginSignup/Login';
import AuthContext from '../../../context/AuthContext';
import mockNavigation from '../../../__mocks__/mockNavigation';

// Mock the AuthContext with a mock loginUser function
const mockLoginUser = jest.fn(() => Promise.resolve()); // Mock loginUser as a resolved promise
const mockContext = {
  loginUser: mockLoginUser,
  authTokens: null,
};

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(() => Promise.resolve()),
}));

describe('Login Component', () => {
  // Test for rendering
    it('renders correctly', async () => {
      const { getByText, getByPlaceholderText } = render(
        <AuthContext.Provider value={mockContext}>
          <Login navigation={mockNavigation} />
        </AuthContext.Provider>
      );
  
      // Wait for font loading and initial render
      await act(async () => {
        await waitFor(() => {
          expect(getByText('Login')).toBeTruthy();
          expect(getByText('Hungry or emptying space in the fridge?')).toBeTruthy();
          expect(getByPlaceholderText('EMAIL')).toBeTruthy();
          expect(getByPlaceholderText('PASSWORD')).toBeTruthy();
        });
      });
    });

  // Test for form submission with invalid email format
  it('shows an error message for invalid email format', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <AuthContext.Provider value={mockContext}>
        <Login navigation={mockNavigation} />
      </AuthContext.Provider>
    );

    const emailInput = getByPlaceholderText('EMAIL');
    const loginButton = getByText('LOGIN');

    // Simulate user inputting an invalid email and pressing the login button
    fireEvent.changeText(emailInput, 'invalidemail');
    fireEvent.press(loginButton);

    // Wait for the error message to appear
    await act(async () => {
      await waitFor(() => {
        expect(getByText('Invalid email format')).toBeTruthy();
      });
    });

    // Simulate user correcting the email
    fireEvent.changeText(emailInput, 'valid@example.com');

    // The error message should disappear
    expect(queryByText('Invalid email format')).toBeNull();
  });

  // Test for form submission with invalid password format
  it('shows an error message for invalid password format', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <AuthContext.Provider value={mockContext}>
        <Login navigation={mockNavigation} />
      </AuthContext.Provider>
    );

    const passwordInput = getByPlaceholderText('PASSWORD');
    const loginButton = getByText('LOGIN');

    // Simulate user inputting an invalid password and pressing the login button
    fireEvent.changeText(passwordInput, '');
    fireEvent.press(loginButton);

    // Wait for the error message to appear
    await act(async () => {
      await waitFor(() => {
        expect(getByText('Password cannot be empty')).toBeTruthy();
      });
    });

    // Simulate user correcting the password
    fireEvent.changeText(passwordInput, 'notempty');

    // The error message should disappear
    expect(queryByText('Password cannot be empty')).toBeNull();
  });

  // Test for password visibility toggle
  it('toggles password visibility', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <AuthContext.Provider value={mockContext}>
        <Login navigation={mockNavigation} />
      </AuthContext.Provider>
    );

    const passwordInput = getByPlaceholderText('PASSWORD');
    const visibilityIcon = getByTestId('password-visibility-icon');

    // Initial state should be password hidden
    expect(passwordInput.props.secureTextEntry).toBeTruthy();

    // Toggle visibility
    fireEvent.press(visibilityIcon);

    // Password should now be visible
    expect(passwordInput.props.secureTextEntry).toBeFalsy();

    // Toggle visibility again
    fireEvent.press(visibilityIcon);

    // Password should be hidden again
    expect(passwordInput.props.secureTextEntry).toBeTruthy();
  });
});
