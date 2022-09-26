import 'react-native';

import React from 'react';
import renderer from 'react-test-renderer';

import { Header } from './Header';

describe('Header', () => {
  test('Should render correctly', () => {
    const tree = renderer
      .create(<Header title="Header" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
