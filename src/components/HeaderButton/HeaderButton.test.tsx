import 'react-native';

import React from 'react';
import renderer from 'react-test-renderer';

import { HeaderButton } from './HeaderButton';

describe('HeaderButton', () => {
  test('Should render correctly', () => {
    const tree = renderer
      .create(<HeaderButton title="HeaderButton" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
