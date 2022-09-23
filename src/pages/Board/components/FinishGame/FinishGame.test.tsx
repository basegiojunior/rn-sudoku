import 'react-native';

import React from 'react';
import renderer from 'react-test-renderer';

import { FinishGame } from './FinishGame';

describe('FinishGame', () => {
  test('Should render correctly', () => {
    const tree = renderer.create(<FinishGame title="FinishGame" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
