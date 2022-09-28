import 'react-native';

import React from 'react';

import { Button } from './Button';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('Button', () => {
  test('Should render title correctly', async () => {
    const title = 'Button';
    render(<Button title={title} />);

    const text = await screen.findByText(title);
    expect(text).toBeTruthy();
  });
  test('Should call onPress correctly', async () => {
    const onPress = jest.fn();
    render(<Button title="Button" onPress={onPress} />);

    const button = await screen.findByTestId('button-pressable');

    fireEvent.press(button);
    expect(onPress).toHaveBeenCalled();
  });
});
