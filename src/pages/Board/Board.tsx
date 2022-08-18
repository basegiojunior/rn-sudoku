import React from 'react';
import { View } from 'react-native';
import Cell from 'src/components/Cell';
import { CellType } from 'src/model/cell';
import {
  clear,
  createEmptyBoard,
  selectCol,
  selectGroup,
  selectLine,
} from 'src/utils/createBoard';
import styles from './Board.style';

export const Board: React.FC = () => {
  const [table, setTable] = React.useState<Array<Array<CellType>>>(
    createEmptyBoard(),
  );

  function onPressCell(rowIndex: number, colIndex: number) {
    const newTable = [...table];
    if (newTable[rowIndex][colIndex].selected) {
      clear({ table: newTable });
      return;
    }

    clear({ table: newTable });
    selectCol({ col: colIndex, table: newTable });
    selectLine({ row: rowIndex, table: newTable });
    selectGroup({ row: rowIndex, col: colIndex, table: newTable });

    setTable(newTable);
  }

  return (
    <View style={styles.container}>
      {table.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <Cell
              cell={cell}
              colIndex={colIndex}
              rowIndex={rowIndex}
              onPress={onPressCell}
              key={rowIndex + colIndex}
            />
          ))}
        </View>
      ))}
    </View>
  );
};
