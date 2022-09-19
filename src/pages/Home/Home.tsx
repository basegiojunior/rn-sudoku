import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button as ReactButton, Pressable, Text, View } from 'react-native';
import Button from 'src/components/Button';
import { MainNavigationProps, RoutesList } from 'src/routes/Routes.types';
import styles from './Home.style';

export const Home: React.FC = () => {
  const { navigate } = useNavigation<MainNavigationProps>();

  function onPressNewGame() {
    navigate(RoutesList.Board);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>SUDOKU</Text>

      <View style={styles.newGameButtonContainer}>
        <Button title="Novo Jogo" onPress={() => {}} />
      </View>
      <Button title="Continuar" variant="secondary" />
    </View>
  );
};
