import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsPage from '../../../components/settingsPage/Settings';

const Stack = createStackNavigator();

describe('SettingsPage', () => {

  it('navigates to the EditProfile screen when the Personal Details item is pressed', async () => {
    const { findByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Settings" component={SettingsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const personalDetailsItem = await findByText('Personal Details');
    fireEvent.press(personalDetailsItem);
  });

  it('navigates to the ChangeEmail screen when the Change Email item is pressed', async () => {
    const { findByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Settings" component={SettingsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const changeEmailItem = await findByText('Change Email');
    fireEvent.press(changeEmailItem);
  });

  it('navigates to the ChangePassword screen when the Change Password item is pressed', async () => {
    const { findByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Settings" component={SettingsPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    const changePasswordItem = await findByText('Change Password');
    fireEvent.press(changePasswordItem);
  });

});