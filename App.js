import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppTab from './navigations/AppTab';
import { navigationRef } from './navigations/RootNavigation';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppTab />
    </NavigationContainer>
  );
};

export default App;
