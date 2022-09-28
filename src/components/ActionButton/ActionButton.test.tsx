import 'react-native';

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { ActionButton } from './ActionButton';

describe('ActionButton', () => {
  test('Should render value correctly', async () => {
    const value = 5;

    render(<ActionButton value={value} />);

    const actionButton = await screen.findByTestId('action-button-text');

    expect(actionButton.children[0]).toEqual(value.toString());
  });
  test('Should call onPress correctly', async () => {
    const value = 5;
    const onPress = jest.fn();
    const onPressDisabled = jest.fn();

    const { update } = render(<ActionButton value={value} onPress={onPress} />);
    const actionButtonEnabled = await screen.findByTestId(
      'action-button-pressable',
    );
    fireEvent.press(actionButtonEnabled);
    expect(onPress).toHaveBeenCalled();

    update(
      <ActionButton value={value} onPress={onPressDisabled} disabled={true} />,
    );
    const actionButtonDisabled = await screen.findByTestId(
      'action-button-pressable',
    );
    fireEvent.press(actionButtonDisabled);
    expect(onPressDisabled).not.toHaveBeenCalled();
  });
});
