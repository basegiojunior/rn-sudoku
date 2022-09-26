import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import ActionButton from 'src/components/ActionButton';
import Cell from 'src/components/Cell';
import Header from 'src/components/Header';
import HeaderButton from 'src/components/HeaderButton';
import Modal from 'src/components/Modal';
import { useGameContext } from 'src/contexts/useGameContext';
import useSudokuBoard, { CELL_VALUES } from 'src/hooks/useSudokuBoard';
import { MainNavigationProps, RoutesList } from 'src/routes/Routes.types';
import { resolveBoard } from 'src/utils/resolveSudoku';
import styles from './Board.style';
import FinishGame from './components/FinishGame';

export const Board: React.FC = () => {
  const { onPressActionCell, onPressCell, globalCompletedValues, won } =
    useSudokuBoard();
  const { table, newGame, solveSudoku } = useGameContext();
  const { navigate, goBack } = useNavigation<MainNavigationProps>();

  function onPressHome() {
    navigate(RoutesList.Home);
  }

  function onPressNewGame() {
    newGame();
  }

  function onPressGoBack() {
    goBack();
  }

  function onPressGiveUp() {
    solveSudoku();
  }

  return (
    <>
      <Header
        left={<HeaderButton text="Voltar" onPress={onPressGoBack} />}
        right={<HeaderButton text="Desistir" onPress={onPressGiveUp} />}
      />
      <View style={styles.container}>
        {table.map((row, rowIndex) => (
          <View key={`${rowIndex}row`} style={styles.row}>
            {row.map((cell, colIndex) => (
              <Cell
                cell={cell}
                colIndex={colIndex}
                rowIndex={rowIndex}
                onPress={onPressCell}
                key={`${colIndex}col`}
                hasError={cell.hasError}
                isEqualToSelected={cell.isEqualToSelected}
              />
            ))}
          </View>
        ))}

        <View style={styles.row}>
          {CELL_VALUES.map(cellValue => (
            <ActionButton
              key={cellValue}
              onPress={() => onPressActionCell(cellValue)}
              value={cellValue}
              disabled={globalCompletedValues.includes(cellValue)}
            />
          ))}
        </View>

        <Modal show={won}>
          <FinishGame
            onPressHome={onPressHome}
            onPressNewGame={onPressNewGame}
          />
        </Modal>
      </View>
    </>
  );
};
