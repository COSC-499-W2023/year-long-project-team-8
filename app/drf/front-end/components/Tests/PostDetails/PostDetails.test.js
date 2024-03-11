import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PostDetails from '../../posts/PostDetails';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: jest.fn(),
    useFocusEffect: jest.fn(),
  };
});

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({ authTokens: 'test-token' }),
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

describe('PostDetails Component', () => {
  it('renders correctly', async () => {
    const { findByText } = render(<PostDetails route={route} />);

    expect(await findByText('Sample Listing')).toBeTruthy();
    expect(await findByText('Description')).toBeTruthy();
    expect(await findByText('Categories')).toBeTruthy();
    expect(await findByText('Allergens')).toBeTruthy();
    expect(await findByText('Peanuts, Gluten')).toBeTruthy();
    expect(await findByText('Mexican')).toBeTruthy();
    expect(await findByText('Meat')).toBeTruthy();


  });


});
