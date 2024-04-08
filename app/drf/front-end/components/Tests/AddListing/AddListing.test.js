import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddListing from '../../addListing/AddListing';


jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: jest.fn(),
    useFocusEffect: jest.fn(),
  };
});

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(() => Promise.resolve()),
  isLoaded: jest.fn(() => true),
}));



jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({ authTokens: 'test-token' }),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
  MaterialIcons: 'MaterialIcons',
}));



jest.mock('@kolking/react-native-rating', () => ({
  Rating: () => 'Rating',
}));

jest.mock('../../helperFunctions/apiHelpers', () => ({
  getUserData: jest.fn(() => Promise.resolve({
    firstname: 'John',
    email: 'john@example.com',
    rating: '4.5',
    received_reviews: [1, 2, 3],
    profile_picture: 'profile.jpg',
  })),
}));

const route = {
  params: {
    listing: {
      id: 1,
      title: 'Sample Listing',
      best_before: '2024-12-31',
      owner: 2,
      images: [{ image: 'image1.jpg' }],
      categories: 'Mexican, Meat',
      content: 'Sample content for testing',
      allergens: 'Peanuts, Gluten',
      created_at: '2024-03-01',
    },
  },
};
describe("<AddListing />", () => {
  // Test case for checking the initial rendering of the component.
  it("renders correctly with initial state", async () => {
    let getByText;
    const rendered = render(<AddListing />);
    getByText = rendered.getByText;
  });

  it("renders title input and accepts input", async () => {
    const { getByTestId, getByPlaceholderText } = render(<AddListing />);
    const titleInput = getByTestId('title-input');
  
    // Check if the title input is rendered
    expect(titleInput).toBeTruthy();
  
    // Simulate typing in the title input
    fireEvent.changeText(titleInput, 'Test Title');
  
    // Check if the input value is updated
    expect(getByPlaceholderText('Title')).toHaveProp('value', 'Test Title');
  });
  

});
