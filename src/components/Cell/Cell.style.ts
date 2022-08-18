import { Dimensions, StyleSheet } from 'react-native';

const cellSize = Math.floor((Dimensions.get('window').width - 30) / 9);

export const makeBackgroundCellStyle = (
  selected: boolean,
  highlighted: boolean,
) => {
  if (highlighted) {
    return styles.highlighted;
  }
  if (selected) {
    return styles.selectable;
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

const styles = StyleSheet.create({
  cellText: {
    fontSize: cellSize * 0.7,
    fontWeight: 'normal',
  },
  cell: {
    width: cellSize,
    height: cellSize,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    borderRightWidth: 1,
    borderRightColor: '#cccccc',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    borderLeftWidth: 1,
    borderLeftColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  highlighted: {
    backgroundColor: '#e0e4ee',
  },
  selectable: {
    backgroundColor: '#bdc6e2',
  },
  withBottomDivider: {
    borderBottomWidth: 2,
    borderBottomColor: '#646464',
  },
  withTopDivider: {
    borderTopWidth: 2,
    borderTopColor: '#646464',
  },
  withRightDivider: {
    borderRightWidth: 2,
    borderRightColor: '#5a5a5a',
  },
  withLeftDivider: {
    borderLeftWidth: 2,
    borderLeftColor: '#5a5a5a',
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
});

export default styles;
