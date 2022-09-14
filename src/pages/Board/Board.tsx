import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import ActionButton from 'src/components/ActionButton';
import Cell from 'src/components/Cell';
import { CellType } from 'src/model/cell';
import { createEmptyBoard } from 'src/utils/emptyBoard';
import {
  CELL_VALUES,
  selectCell,
  fillCellValue,
  getRemainingValuesFromTable,
  clearSelectedCell,
} from 'src/utils/manipulateBoard';
import { startBoard } from 'src/utils/startBoard';
import styles from './Board.style';

export const Board: React.FC = () => {
  const [table, setTable] = useState<Array<Array<CellType>>>(
    createEmptyBoard(),
  );
  const [selectedCell, setSelectedCell] = useState<undefined | CellType>();
  // const [startBoardGen, setStartBoardGen] = useState<any>();

  function onPressCell(rowIndex: number, colIndex: number) {
    const newTable = [...table];
    if (newTable[rowIndex][colIndex].selected) {
      clearSelectedCell({ table: newTable });
      setSelectedCell(undefined);
      return;
    }

    setSelectedCell(newTable[rowIndex][colIndex]);

    clearSelectedCell({ table: newTable });
    selectCell({ table: newTable, selectedCell: newTable[rowIndex][colIndex] });
    setTable(newTable);
  }

  function newBoard() {
    const newTable = startBoard({ level: 'hard' });

    setTable(newTable);
  }

  function onPressActionCell(cellValue: number) {
    if (selectedCell) {
      const newTable = [...table];
      const newValue = selectedCell?.value === cellValue ? 0 : cellValue;

      fillCellValue({
        table: newTable,
        selectedCell,
        newValue,
      });
      setTable(newTable);
      setSelectedCell({ ...selectedCell, value: newValue });
    }
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
              key={`${rowIndex}+${colIndex}`}
              hasError={cell.hasError}
              isEqualToSelected={cell.isEqualToSelected}
              valuesTest={cell.remaining}
            />
          ))}
        </View>
      ))}

      <View style={styles.row}>
        {CELL_VALUES.map(cellValue => (
          <ActionButton
            key={cellValue}
            variant="valueOption"
            onPress={() => onPressActionCell(cellValue)}
            value={cellValue}
            disabled={
              !getRemainingValuesFromTable({ table }).includes(cellValue)
            }
          />
        ))}
      </View>
      <Button title="new board" onPress={newBoard} />
    </View>
  );
};
