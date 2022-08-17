import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Cell } from '../../model/cell';
import styles, {
  makeBackgroundCellStyle,
  makeBordersCellContainerStyle,
  makeBordersCellStyle,
} from './Home.style';

function fillCells(): Array<Array<Cell>> {
  const cells: Array<Array<Cell>> = [];
  for (let row = 0; row < 9; row++) {
    cells.push([]);
    for (let col = 0; col < 9; col++) {
      cells[row].push({
        col,
        row,
        highlighted: false,
        selected: false,
        value: 1,
      });
    }
  }
  return cells;
}

export const Home: React.FC = () => {
  const [table, setTable] = React.useState<Array<Array<Cell>>>(fillCells());

  function selectLine({ row }: { row: number }) {
    const tableTemp = [...table];

    tableTemp[row].forEach(cell => {
      cell.highlighted = true;
    });

    setTable(tableTemp);
  }

  function selectCol({ col }: { col: number }) {
    const tableTemp = [...table];

    tableTemp.forEach((line, index) => {
      tableTemp[index][col].highlighted = true;
    });

    setTable(tableTemp);
  }

  function selectGroup({ row, col }: { row: number; col: number }) {
    const tableTemp = [...table];
    const rowStart = row - (row % 3);
    const rowEnd = rowStart + 3;
    const colStart = col - (col % 3);
    const colEnd = colStart + 3;

    for (let i = rowStart; i < rowEnd; i++) {
      for (let j = colStart; j < colEnd; j++) {
        tableTemp[i][j].highlighted = true;
      }
    }

    tableTemp[row][col].highlighted = false;
    tableTemp[row][col].selected = true;

    setTable(tableTemp);
  }

  function clear() {
    const tableTemp = [...table];

    tableTemp.forEach(line => {
      line.forEach(cell => {
        cell.selected = false;
        cell.highlighted = false;
      });
    });

    setTable(tableTemp);
  }

  function onPressCell(rowIndex: number, colIndex: number) {
    if (table[rowIndex][colIndex].selected) {
      clear();
      return;
    }

    clear();
    selectCol({ col: colIndex });
    selectLine({ row: rowIndex });
    selectGroup({ row: rowIndex, col: colIndex });
  }

  return (
    <View style={styles.container}>
      {table.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <View
              style={[...makeBordersCellContainerStyle(rowIndex, cellIndex)]}>
              <Pressable
                key={cellIndex}
                onPress={() => onPressCell(rowIndex, cellIndex)}
                style={[
                  styles.cell,
                  makeBackgroundCellStyle(cell.selected, cell.highlighted),
                  ...makeBordersCellStyle(rowIndex, cellIndex),
                ]}>
                <Text>{cell.value}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};
