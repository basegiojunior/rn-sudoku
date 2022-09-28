import 'react-native';

import React from 'react';

import { FinishGame } from './FinishGame';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('FinishGame', () => {
  test('Should call functions correctly', async () => {
    const onPressHome = jest.fn();
    const onPressNewGame = jest.fn();

    render(
      <FinishGame onPressHome={onPressHome} onPressNewGame={onPressNewGame} />,
    );

    const newGameButton = await screen.findByText('Novo Jogo');
    const homeButton = await screen.findByText('Início');

    fireEvent.press(newGameButton);
    fireEvent.press(homeButton);

    expect(onPressHome).toHaveBeenCalled();
    expect(onPressNewGame).toHaveBeenCalled();
  });
});
