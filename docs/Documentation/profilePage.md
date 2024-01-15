# Profile Page Documentation

## 1. ProfilePage.js Component

### Overview
The `ProfilePage` component represents the user's profile page in the React Native application. It displays user information, rating, recent posts, and provides an option to view all posts.

### Props
None.

### State
- `userData`: Holds the user's data fetched from the server.
- `rating`: Constant, representing the user's rating (default set to 3.5).

### Methods
- `getUserDisplayName(userData)`: Formats and returns the user's display name.
- `renderRecentPosts()`: Renders three placeholder post components.

### Usage
1. Import the `ProfilePage` component.
2. Include it in your component hierarchy.
3. Ensure that the `AuthContext` is set up to provide authentication tokens and user ID.

## 2. ProfilePageStyles.js Stylesheet

### Overview
The `ProfilePageStyles` module defines the styles used in the `ProfilePage` component. It includes styles for the main container, user rating, profile information, recent posts, and a "View All" button.

### Styles
- `container`: Main container style.
- `ratingContainer`: Style for the container displaying the user's rating.
- `profileContainer`: Style for the container displaying user profile information.
- `profilePicture`: Style for the user's profile picture.
- `name`: Style for the user's name.
- `locationContainer`: Style for the container displaying the user's location.
- `centeredPostsContainer`: Style for the container centering recent posts.
- `postsContainer`: Style for the container displaying multiple post components.
- `recentPostsText`: Style for the "Recent Posts" text.
- `postContainer`: Style for individual post containers.
- `viewAllButton`: Style for the "View All" button.
- `viewAllButtonText`: Style for the "View All" button text.

### Colors
- `lightOrange`, `mediumOrange`, `darkOrange`, `darkGray`: Hexadecimal color codes used in the styles.

## 3. RatingsIcons.js Component

### Overview
The `StarRating` component takes a `rating` prop and displays star icons based on the provided rating value.

### Props
- `rating`: The user's rating value.

### Styles
Styles are defined dynamically based on the state of stars (filled, half-filled, empty).

### Usage
1. Import the `StarRating` component.
2. Provide the `rating` prop to display the corresponding stars.

## Example Usage
```jsx
import React from 'react';
import { View } from 'react-native';
import ProfilePage from './ProfilePage';
import styles from './ProfilePageStyles';

const App = () => {
  return (
    <View style={styles.container}>
      <ProfilePage />
    </View>
  );
};

export default App;
```

#### Documentation written by ChatGPT, an AI language model developed by OpenAI.
