import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { CellProps } from './Cell.types';
import styles, {
  makeBackgroundCellStyle,
  makeBordersCellContainerStyle,
  makeBordersCellStyle,
} from './Cell.style';
import { CELL_VALUES } from 'src/utils/manipulateBoard';

const VALUES_TEST = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

export const Cell: React.FC<CellProps> = props => {
  const { valuesTest = [] } = props;

  return (
    <View
      style={[
        ...makeBordersCellContainerStyle(props.rowIndex, props.colIndex),
      ]}>
      <Pressable
        onPress={() => props.onPress(props.rowIndex, props.colIndex)}
        style={[
          styles.cell,
          makeBackgroundCellStyle(props.cell.selected, props.cell.highlighted),
          ...makeBordersCellStyle(props.rowIndex, props.colIndex),
        ]}>
        {props.cell.value !== 0 ? (
          <Text
            style={[
              styles.cellText,
              props.isEqualToSelected && styles.isEqualToSelectedCellText,
              props.hasError && styles.hasErrorCellText,
            ]}>
            {props.cell.value}
          </Text>
        ) : (
          VALUES_TEST.map(row => {
            return (
              <View style={styles.row}>
                {row.map(item => (
                  <Text
                    style={[
                      styles.textTest,
                      valuesTest.includes(item)
                        ? styles.textTestShow
                        : styles.textTestHide,
                    ]}>
                    {item}
                  </Text>
                ))}
              </View>
            );
          })
        )}
      </Pressable>
    </View>
  );
};
