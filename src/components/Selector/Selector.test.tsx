import 'react-native';

import React from 'react';
import renderer from 'react-test-renderer';

import { Selector } from './Selector';

describe('Selector', () => {
  test('Should render correctly', () => {
    const tree = renderer
      .create(<Selector title="Selector" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
