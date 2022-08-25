import 'react-native';

import React from 'react';
import renderer from 'react-test-renderer';

import { ActionButton } from './ActionButton';

describe('ActionButton', () => {
  test('Should render correctly', () => {
    const tree = renderer
      .create(<ActionButton title="ActionButton" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
