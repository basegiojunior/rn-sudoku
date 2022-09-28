import React from 'react';
import { Text, Pressable } from 'react-native';
import { ActionButtonProps } from './ActionButton.types';
import styles from './ActionButton.style';

export const ActionButton: React.FC<ActionButtonProps> = props => {
  return (
    <Pressable
      onPress={props.onPress}
      style={styles.container}
      disabled={props.disabled}
      testID="action-button-pressable">
      <Text
        style={[
          styles.valueOptionText,
          props.disabled && styles.valueOptionTextDisabled,
        ]}
        testID="action-button-text">
        {props.value}
      </Text>
    </Pressable>
  );
};
