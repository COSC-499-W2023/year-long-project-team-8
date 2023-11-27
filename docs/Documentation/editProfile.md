# Edit Profile Documentation

## Overview
The Edit Profile feature in this React Native application allows users to update their personal information, including their first name, last name, phone number, and email address. The implementation consists of three main components: `EditProfilePage`, `EditProfileForm`, and `editProfileStyles`.

### 1. `EditProfilePage` Component
- **Description:**
  The `EditProfilePage` component serves as the main interface for users to edit their profile information. It integrates the user interface defined in `EditProfileForm` and utilizes styles from `editProfileStyles`. This component manages the state for user data and form input values, fetches initial user data, handles updates, and provides navigation functionality.

- **Props:**
  None.

- **State:**
  - `userData`: Holds the user's data fetched from the server.
  - `firstname`, `lastname`, `phone`, `email`: State variables for first name, last name, phone number, and email input fields.
  - `prevEmail`, `prevPhone`, `prevFirstName`, `prevLastName`: Previous values of email, phone, first name, and last name before any edits.

- **Methods:**
  - `handleSaveDetails`: Invoked when the user saves changes. It updates the user data via an API call and then fetches the updated data for display.
  - `goBack`: Navigates the user back to the previous screen.
  
- **Dependencies:**
  - `getUserData`: Function to fetch user data from the server.
  - `updateUserData`: Function to update user data on the server.

- **Hooks:**
  - `useEffect`: Fetches user data when the component mounts or when dependencies (`userId` and `authTokens`) change.
  - `BackHandler`: Handles hardware back button press to navigate back.

### 2. `EditProfileForm` Component
- **Description:**
  The `EditProfileForm` component defines the structure of the form for editing user profile details. It includes input fields for first name, last name, phone number, and email. Additionally, it provides functions for formatting and validating user inputs.

- **Props:**
  - `firstname`, `lastname`, `phone`, `email`: State variables for first name, last name, phone number, and email.
  - `setFirstName`, `setLastName`, `setPhone`, `setEmail`: State updater functions for the corresponding input fields.
  - `prevEmail`, `setPrevEmail`: Previous email value and its updater function.

- **Methods:**
  - `formatPhoneNumber`: Formats the phone number input as the user types.
  - `phoneFormatting`: Formats the phone number for display.
  - `validEmail`: Validates and updates the email input.

### 3. `editProfileStyles` Stylesheet
- **Description:**
  The `editProfileStyles` module contains the styles used in the `EditProfilePage` and `EditProfileForm` components. It defines a color palette and styling for various elements such as text, input fields, and containers.

- **Colors:**
  - `lightOrange`, `mediumOrange`, `darkOrange`, `darkGray`, `inputGrey`: Hexadecimal color codes used in the styles.

- **Styles:**
  - Various styles for the SafeAreaView, top navigation bar, back arrow, save button, name text and input containers, phone number text and input containers, email text and input containers.

## Usage
To integrate the Edit Profile feature into your application, follow these steps:

1. Import the `EditProfilePage` component in the file where you manage your app's navigation.
2. Include the `EditProfilePage` component in your navigation stack.
3. Ensure that the `AuthContext` is set up to provide authentication tokens and user ID.
4. Customize the styles in `editProfileStyles` to match your application's design.

Now, users can navigate to the Edit Profile screen, make changes, and save them using the provided UI. The component architecture allows for easy maintenance and modification of the Edit Profile feature.

#### Documentation written by ChatGPT, an AI language model developed by OpenAI.
