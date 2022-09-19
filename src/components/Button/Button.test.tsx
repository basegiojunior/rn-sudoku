import 'react-native';

import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from './Button';

describe('Button', () => {
  test('Should render correctly', () => {
    const tree = renderer
      .create(<Button title="Button" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
