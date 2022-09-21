import React from 'react';
import { Button, View } from 'react-native';
import ActionButton from 'src/components/ActionButton';
import Cell from 'src/components/Cell';
import { useGameContext } from 'src/contexts/useGameContext';
import useSudokuBoard, { CELL_VALUES } from 'src/hooks/useSudokuBoard';
import styles from './Board.style';

export const Board: React.FC = () => {
  const { onPressActionCell, onPressCell, globalCompletedValues } =
    useSudokuBoard();
  const { table, newGame } = useGameContext();

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
      <Button title="new board" onPress={newGame} />
    </View>
  );
};
