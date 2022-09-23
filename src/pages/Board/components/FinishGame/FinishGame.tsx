import React from 'react';
import { View, Text } from 'react-native';
import { FinishGameProps } from './FinishGame.types';
import styles from './FinishGame.style';
import Button from 'src/components/Button';

export const FinishGame: React.FC<FinishGameProps> = props => {
  return (
    <>
      <Text style={styles.text}>Parabéns! Você ganhou</Text>
      <View style={styles.newGameButtonContainer}>
        <Button onPress={props.onPressNewGame} title="Novo Jogo" />
        <View style={styles.spaceBetweenButtons} />
        <Button onPress={props.onPressHome} title="Início" />
      </View>
    </>
  );
};
