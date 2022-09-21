/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { GameContextProvider } from './contexts/useGameContext';
import MainRoutes from './routes/Routes';

const App = () => {
  return (
    <GameContextProvider>
      <MainRoutes />
    </GameContextProvider>
  );
};

export default App;
