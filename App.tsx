import React from 'react';
import { Provider } from 'react-redux';

import { store } from './src/store';
import Route from './src/navigation';
import { DataProvider } from './src/components/DataProvider';

const App = () => {
  return (
    <Provider store={store}>
      <DataProvider>
        <Route/>
      </DataProvider>
    </Provider>
  );
};

export default App;
