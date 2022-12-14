import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import Button from 'src/components/Button';
import Selector from 'src/components/Selector';
import { useGameContext } from 'src/contexts/useGameContext';
import { DifficultyLevels } from 'src/model/game';
import { MainNavigationProps, RoutesList } from 'src/routes/Routes.types';
import { DIFFICULTY_TRANSLATION } from 'src/utils/translations';
import styles from './Home.style';

export const Home: React.FC = () => {
  const { navigate } = useNavigation<MainNavigationProps>();
  const { newGame, difficultySelected, changeDifficultyIndex } =
    useGameContext();

  function translateDifficulty(difficulty: DifficultyLevels) {
    return DIFFICULTY_TRANSLATION[difficulty];
  }

  function onPressNewGame() {
    newGame();
    navigate(RoutesList.Board);
  }

  function onPressContinueGame() {
    navigate(RoutesList.Board);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.gameTitle}>SUDOKU</Text>

      <View style={styles.selectorContainer}>
        <Selector
          items={Object.values(DifficultyLevels)}
          translateItem={translateDifficulty}
          onChange={changeDifficultyIndex}
          itemSelected={difficultySelected}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Novo Jogo" onPress={onPressNewGame} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Continuar"
          variant="secondary"
          onPress={onPressContinueGame}
        />
      </View>
    </View>
  );
};
