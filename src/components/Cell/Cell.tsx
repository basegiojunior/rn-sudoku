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
          makeBackgroundCellStyle(
            props.cell.selected || props.isEqualToSelected,
            props.cell.highlighted,
          ),
          ...makeBordersCellStyle(props.rowIndex, props.colIndex),
        ]}>
        {props.cell.value !== 0 && (
          <Text
            style={[
              styles.cellText,
              props.isEqualToSelected && styles.isEqualToSelectedCellText,
              props.hasError && styles.hasErrorCellText,
            ]}>
            {props.cell.value}
          </Text>
        )}
      </Pressable>
    </View>
  );
};
