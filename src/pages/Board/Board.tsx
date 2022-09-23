import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import ActionButton from 'src/components/ActionButton';
import Cell from 'src/components/Cell';
import Modal from 'src/components/Modal';
import { useGameContext } from 'src/contexts/useGameContext';
import useSudokuBoard, { CELL_VALUES } from 'src/hooks/useSudokuBoard';
import { MainNavigationProps, RoutesList } from 'src/routes/Routes.types';
import styles from './Board.style';
import FinishGame from './components/FinishGame';

export const Board: React.FC = () => {
  const { onPressActionCell, onPressCell, globalCompletedValues } =
    useSudokuBoard();
  const { table, newGame } = useGameContext();
  const { navigate } = useNavigation<MainNavigationProps>();

  function onPressHome() {
    navigate(RoutesList.Home);
  }

  function onPressNewGame() {
    newGame();
  }

  return (
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

      <Modal show={globalCompletedValues.length === 9}>
        <FinishGame onPressHome={onPressHome} onPressNewGame={onPressNewGame} />
      </Modal>
    </View>
  );
};
