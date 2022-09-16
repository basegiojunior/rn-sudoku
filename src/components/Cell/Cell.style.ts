import { Dimensions, StyleSheet } from 'react-native';

const cellSize = Math.floor((Dimensions.get('window').width - 30) / 9);

export const makeBackgroundCellStyle = (
  selected: boolean,
  highlighted: boolean,
) => {
  if (selected) {
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

const styles = StyleSheet.create({
  cellText: {
    fontSize: cellSize * 0.7,
    color: '#2e2e2e',
    fontWeight: 'normal',
  },
  textTest: {
    fontSize: cellSize * 0.3,
    lineHeight: cellSize * 0.3,
  },
  textTestShow: {
    color: '#3d3d3d',
  },
  textTestHide: {
    color: 'transparent',
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
  hasErrorCellText: {
    color: '#a70f0f',
  },
  isEqualToSelectedCellText: {
    color: '#0f19a7',
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
  row: {
    flexDirection: 'row',
  },
});

export default styles;
