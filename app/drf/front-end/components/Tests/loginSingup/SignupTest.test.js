import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Signup from '../../loginSignup/Signup';
import AuthContext from '../../../context/AuthContext';

// Mock the AuthContext with a mock loginUser function
const mockLoginUser = jest.fn(() => Promise.resolve());
const mockContext = {
  loginUser: mockLoginUser,
  authTokens: null,
};

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
};

describe('Signup Component', () => {
  // Test for rendering
  it('renders correctly', async () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={mockContext}>
        <Signup navigation={mockNavigation} />
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(getByText('Sign Up')).toBeTruthy();
      expect(getByText('Create an account and join the community!')).toBeTruthy();
      expect(getByPlaceholderText('EMAIL')).toBeTruthy();
      expect(getByPlaceholderText('PASSWORD')).toBeTruthy();
      expect(getByPlaceholderText('CONFIRM PASSWORD')).toBeTruthy();
    });
  });

  // Test for input field updates
  it('updates the email, password, and confirm password state when input changes', async () => {
    const { getByPlaceholderText } = render(
      <AuthContext.Provider value={mockContext}>
        <Signup navigation={mockNavigation} />
      </AuthContext.Provider>
    );

    const emailInput = getByPlaceholderText('EMAIL');
    const passwordInput = getByPlaceholderText('PASSWORD');
    const confirmPasswordInput = getByPlaceholderText('CONFIRM PASSWORD');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password123');

    await waitFor(() => {
      expect(emailInput.props.value).toBe('test@example.com');
      expect(passwordInput.props.value).toBe('password123');
      expect(confirmPasswordInput.props.value).toBe('password123');
    });
  });

  // Test for validation errors
  it('shows validation errors for email, password, and confirm password', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AuthContext.Provider value={mockContext}>
        <Signup navigation={mockNavigation} />
      </AuthContext.Provider>
    );

    const emailInput = getByPlaceholderText('EMAIL');
    const passwordInput = getByPlaceholderText('PASSWORD');
    const confirmPasswordInput = getByPlaceholderText('CONFIRM PASSWORD');
    const signupButton = getByText('SIGN UP');

    fireEvent.changeText(emailInput, 'invalidemail');
    fireEvent.changeText(passwordInput, '');
    fireEvent.changeText(confirmPasswordInput, 'wrongconfirm');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(getByText('Invalid email')).toBeTruthy();
      expect(getByText("Password doesn't meet the requirements")).toBeTruthy();
      expect(getByText('Passwords do not match')).toBeTruthy();
    });
  });

  // // Test for successful signup navigation
  // it('navigates to Details screen after successful signup', async () => {
  //   const { getByPlaceholderText, getByText } = render(
  //     <AuthContext.Provider value={mockContext}>
  //       <Signup navigation={mockNavigation} />
  //     </AuthContext.Provider>
  //   );

  //   const emailInput = getByPlaceholderText('EMAIL');
  //   const passwordInput = getByPlaceholderText('PASSWORD');
  //   const confirmPasswordInput = getByPlaceholderText('CONFIRM PASSWORD');
  //   const signupButton = getByText('SIGN UP');

  //   fireEvent.changeText(emailInput, 'test@example.com');
  //   fireEvent.changeText(passwordInput, 'password123');
  //   fireEvent.changeText(confirmPasswordInput, 'password123');
  //   fireEvent.press(signupButton);

  //   await waitFor(() => {
  //     expect(mockNavigation.navigate).toHaveBeenCalledWith('Details');
  //   });
  // });

  // Test for password visibility toggle
  it('toggles password visibility when the visibility icon is pressed', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <AuthContext.Provider value={mockContext}>
        <Signup navigation={mockNavigation} />
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
