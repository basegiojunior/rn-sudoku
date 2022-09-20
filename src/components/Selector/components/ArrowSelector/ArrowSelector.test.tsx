import 'react-native';

import React from 'react';
import renderer from 'react-test-renderer';

import { ArrowSelector } from './ArrowSelector';

describe('ArrowSelector', () => {
  test('Should render correctly', () => {
    const tree = renderer
      .create(<ArrowSelector title="ArrowSelector" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
