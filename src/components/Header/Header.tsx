import React from 'react';
import { Text, View } from 'react-native';
import { HeaderProps } from './Header.types';
import styles from './Header.style';

export const Header: React.FC<HeaderProps> = props => {
  return (
    <View style={styles.container}>
      {props.left}
      {props.right}
    </View>
  );
};
