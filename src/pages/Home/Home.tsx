import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button as ReactButton, Pressable, Text, View } from 'react-native';
import Button from 'src/components/Button';
import Selector from 'src/components/Selector';
import { DifficultyLevels } from 'src/model/cell';
import { MainNavigationProps, RoutesList } from 'src/routes/Routes.types';
import styles from './Home.style';

const DIFFICULTY_TRANSLATION: Record<DifficultyLevels, string> = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
};

const difficultyItems = Object.entries(DIFFICULTY_TRANSLATION).map(
  entry => entry[1],
);

export const Home: React.FC = () => {
  const { navigate } = useNavigation<MainNavigationProps>();
  const [difficultySelected, setDifficultySelected] = useState(0);

  function onPressChevronLeft() {
    if (difficultySelected > 0) {
      setDifficultySelected(difficultySelected - 1);
    }
  }

  function onPressChevronRight() {
    if (difficultySelected < 2) {
      setDifficultySelected(difficultySelected + 1);
    }
  }

  function onPressNewGame() {
    navigate(RoutesList.Board);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>SUDOKU</Text>

      <Selector
        items={difficultyItems}
        onPressLeft={onPressChevronLeft}
        onPressRight={onPressChevronRight}
        itemIndexSelected={difficultySelected}
      />
      <View style={styles.newGameButtonContainer}>
        <Button title="Novo Jogo" onPress={onPressNewGame} />
      </View>
      <Button title="Continuar" variant="secondary" />
    </View>
  );
};
