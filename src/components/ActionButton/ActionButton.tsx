import React from 'react';
import { Text, Pressable } from 'react-native';
import { ActionButtonProps } from './ActionButton.types';
import styles from './ActionButton.style';

export const ActionButton: React.FC<ActionButtonProps> = props => {
  return (
    <Pressable onPress={props.onPress} style={styles.container}>
      <Text
        style={[
          styles.valueOptionText,
          props.disabled && styles.valueOptionTextDisabled,
        ]}>
        {props.value}
      </Text>
    </Pressable>
  );
};
