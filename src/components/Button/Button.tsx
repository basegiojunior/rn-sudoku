import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ButtonProps } from './Button.types';
import styles, { buttonVariantStyle } from './Button.style';

export const Button: React.FC<ButtonProps> = props => {
  const { variant = 'primary' } = props;
  return (
    <Pressable
      onPress={props.onPress}
      android_ripple={{ color: '#00000050' }}
      style={[styles.button, buttonVariantStyle[variant]]}>
      <Text style={styles.title}>{props.title}</Text>
    </Pressable>
  );
};
