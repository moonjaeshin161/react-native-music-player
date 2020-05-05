import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import FlashMessage from "react-native-flash-message";

import AppTab from './navigations/AppTab';
import { navigationRef } from './navigations/RootNavigation';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <AppTab />
        <FlashMessage position="bottom" />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
