import 'react-native';

import React from 'react';
import renderer from 'react-test-renderer';

import { Cell } from './Cell';

describe('Cell', () => {
  test('Should render correctly', () => {
    const tree = renderer.create(<Cell title="Cell" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
