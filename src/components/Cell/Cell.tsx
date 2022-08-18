import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { CellProps } from './Cell.types';
import styles, {
  makeBackgroundCellStyle,
  makeBordersCellContainerStyle,
  makeBordersCellStyle,
} from './Cell.style';

export const Cell: React.FC<CellProps> = props => {
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
        <Text style={styles.cellText}>{props.cell.value}</Text>
      </Pressable>
    </View>
  );
};
