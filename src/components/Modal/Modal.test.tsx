import 'react-native';

import React from 'react';
import renderer from 'react-test-renderer';

import { Modal } from './Modal';

describe('Modal', () => {
  test('Should render correctly', () => {
    const tree = renderer
      .create(<Modal title="Modal" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
