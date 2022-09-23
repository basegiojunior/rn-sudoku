import React from 'react';
import { View } from 'react-native';
import { ModalProps } from './Modal.types';
import styles from './Modal.style';

export const Modal: React.FC<ModalProps> = props => {
  if (!props.show) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>{props.children}</View>
    </View>
  );
};
