import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ButtonProps } from './Button.types';
import styles, { buttonVariantStyle } from './Button.style';
import { colors } from 'src/styles/colors';

export const Button: React.FC<ButtonProps> = props => {
  const { variant = 'primary', fullWidth = true } = props;

  return (
    <Pressable
      onPress={props.onPress}
      android_ripple={{ color: colors.black.alpha30 }}
      style={[
        styles.button,
        fullWidth && styles.buttonFullWidth,
        buttonVariantStyle[variant],
      ]}>
      <Text style={styles.title}>{props.title}</Text>
    </Pressable>
  );
};
