import React from 'react';
import App from './App';
import { ProviderWrapper as TodosProvider } from 'contexts/adsContext';

const AppContainer = () => {
  return (
      <TodosProvider>
      <App/>
      </TodosProvider>
 
  );
}

export default AppContainer;
