import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import SettingsPage from '../../../components/settingsPage/Settings';

describe('SettingsPage', () => {
  it('renders without crashing', () => {
    render(
      <NavigationContainer>
        <SettingsPage />
      </NavigationContainer>
    );
  });
});