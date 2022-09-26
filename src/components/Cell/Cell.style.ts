import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'src/styles/colors';

const cellSize = Math.floor((Dimensions.get('window').width - 30) / 9);

export const makeBackgroundCellStyle = (
  isEqualToSelected: boolean,
  highlighted: boolean,
) => {
  if (isEqualToSelected) {
    return styles.selectable;
  }
  if (highlighted) {
    return styles.highlighted;
  }
  return null;
};

export const makeBordersCellStyle = (row: number, col: number) => {
  const arrayStyles = [];
  if (row === 2 || row === 5 || row === 8) {
    arrayStyles.push(styles.withoutBottomDivider);
  }
  if (row === 0 || row === 3 || row === 6) {
    arrayStyles.push(styles.withoutTopDivider);
  }
  if (col === 2 || col === 5 || col === 8) {
    arrayStyles.push(styles.withoutRightDivider);
  }
  if (col === 0 || col === 3 || col === 6) {
    arrayStyles.push(styles.withoutLeftDivider);
  }

  return arrayStyles;
};

export const makeBordersCellContainerStyle = (row: number, col: number) => {
  const arrayStyles = [];
  if (row === 2 || row === 5 || row === 8) {
    arrayStyles.push(styles.withBottomDivider);
  }
  if (row === 0) {
    arrayStyles.push(styles.withTopDivider);
  }
  if (col === 2 || col === 5 || col === 8) {
    arrayStyles.push(styles.withRightDivider);
  }
  if (col === 0) {
    arrayStyles.push(styles.withLeftDivider);
  }

  return arrayStyles;
};

const borderColor = colors.black[200];
const borderColorDivider = colors.black[600];
const highlightedBackgroundColor = colors.black[50];

const styles = StyleSheet.create({
  cellText: {
    fontSize: cellSize * 0.7,
    color: colors.black[800],
    fontWeight: 'normal',
  },
  cell: {
    width: cellSize,
    height: cellSize,
    borderTopWidth: 1,
    borderTopColor: borderColor,
    borderRightWidth: 1,
    borderRightColor: borderColor,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    borderLeftWidth: 1,
    borderLeftColor: borderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  highlighted: {
    backgroundColor: highlightedBackgroundColor,
  },
  hasErrorCellText: {
    color: colors.red[500],
  },
  isEqualToSelectedCellText: {
    color: colors.blue[600],
  },
  selectable: {
    backgroundColor: colors.blue[100],
  },
  withBottomDivider: {
    borderBottomWidth: 2,
    borderBottomColor: borderColorDivider,
  },
  withTopDivider: {
    borderTopWidth: 2,
    borderTopColor: borderColorDivider,
  },
  withRightDivider: {
    borderRightWidth: 2,
    borderRightColor: borderColorDivider,
  },
  withLeftDivider: {
    borderLeftWidth: 2,
    borderLeftColor: borderColorDivider,
  },
  withoutTopDivider: {
    borderTopWidth: 0,
  },
  withoutBottomDivider: {
    borderBottomWidth: 0,
  },
  withoutRightDivider: {
    borderRightWidth: 0,
  },
  withoutLeftDivider: {
    borderLeftWidth: 0,
  },
  row: {
    flexDirection: 'row',
  },
});

export default styles;
