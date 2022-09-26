import React from 'react';
import { Pressable, Text } from 'react-native';
import { HeaderButtonProps } from './HeaderButton.types';
import styles from './HeaderButton.style';

export const HeaderButton: React.FC<HeaderButtonProps> = props => {
  return (
    <Pressable onPress={props.onPress} style={styles.container}>
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  );
};
