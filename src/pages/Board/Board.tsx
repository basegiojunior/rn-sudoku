import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import ActionButton from 'src/components/ActionButton';
import Cell from 'src/components/Cell';
import { CellType } from 'src/model/cell';
import { createEmptyBoard } from 'src/utils/emptyBoard';
import {
  clearSelectedCell,
  CELL_VALUES,
  selectCell,
  fillCellValue,
  clearCellValue,
  getRemainingValues,
  getRemainingValuesByIndex,
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
    let newTable = createEmptyBoard();

    let success = false;

    while (!success) {
      const filled = startBoard({ table: newTable });

      if (filled === 81) {
        success = true;
      } else {
        newTable = createEmptyBoard();
      }
    }

    setTable(newTable);
  }

  function newBoardTime() {
    let globalCount = 0;
    const counts = [];

    const init = new Date();

    while (globalCount < 1000) {
      console.log(globalCount);
      let newTable = [...table];

      let error = true;
      let count = 0;

      while (error) {
        count++;
        newTable = createEmptyBoard();
        const filled = startBoard({ table: newTable });

        if (filled >= 81) {
          error = false;
        }
      }

      counts.push(count);

      globalCount++;
    }

    const end = new Date();
    const timeDif = Math.abs((end.getTime() - init.getTime()) / 1000 / 1000);

    const sum = counts.reduce((prev, current) => prev + current);
    console.log('média', sum / counts.length);
    console.log('time', timeDif, 's');

    // setTable(newTable);
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
              valuesTest={getRemainingValuesByIndex({
                table,
                row: rowIndex,
                col: colIndex,
              })}
            />
          ))}
        </View>
      ))}

      <View style={styles.row}>
        {CELL_VALUES.map(cellValue => (
          <ActionButton
            key={cellValue}
            variant="valueOption"
            onPress={() => {
              const newTable = [...table];

              if (
                selectedCell &&
                (!selectedCell?.value || selectedCell?.value !== cellValue)
              ) {
                fillCellValue({
                  table: newTable,
                  selectedCell: selectedCell,
                  newValue: cellValue,
                });
                setTable(newTable);
                setSelectedCell({ ...selectedCell, value: cellValue });
              } else if (selectedCell && selectedCell.value) {
                clearCellValue({ selectedCell, table: newTable });
                setTable(newTable);
                setSelectedCell({ ...selectedCell, value: 0 });
              }
            }}
            value={cellValue}
            disabled={!getRemainingValues({ table }).includes(cellValue)}
          />
        ))}
      </View>
      <Button title="new board" onPress={newBoard} />
    </View>
  );
};
