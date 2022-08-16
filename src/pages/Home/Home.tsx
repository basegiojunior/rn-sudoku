import React from 'react';
import { Button, Text, View } from 'react-native';
import styles from './Home.style';

export const Home: React.FC = () => {
  const [table, setTable] = React.useState<Array<Array<null | number>>>([
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ]);

  function selectLine({ line }: { line: number }) {
    const tableTemp = [...table];

    tableTemp[line].fill(1);

    setTable(tableTemp);
  }

  function selectCol({ col }: { col: number }) {
    const tableTemp = [...table];

    tableTemp.forEach((line, index) => {
      tableTemp[index][col] = 1;
    });

    setTable(tableTemp);
  }

  function selectGroup({ line, col }: { line: number; col: number }) {
    const tableTemp = [...table];

    for (let i = line * 3; i < line * 3 + 3; i++) {
      for (let j = col * 3; j < col * 3 + 3; j++) {
        tableTemp[i][j] = 1;
      }
    }

    setTable(tableTemp);
  }

  function clear() {
    const tableTemp = [...table];

    tableTemp.forEach(line => {
      line.fill(null);
    });

    setTable(tableTemp);
  }

  return (
    <View style={styles.container}>
      {table.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <View
              key={cellIndex}
              style={[styles.cell, cell != null ? styles.selectable : null]}>
              <Text>{cell}</Text>
            </View>
          ))}
        </View>
      ))}

      <Button title="Action" onPress={() => selectLine({ line: 6 })} />
      <Button title="Desaction" onPress={clear} />
    </View>
  );
};
