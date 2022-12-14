import { IndexesType } from 'src/model/cell';
import { CELL_VALUES } from 'src/hooks/useSudokuBoard';

export function getRowIndexes(rowOrigin: number): Array<IndexesType> {
  const indexes: Array<IndexesType> = [];

  for (let col = 0; col < 9; col++) {
    indexes.push({
      row: rowOrigin,
      col,
    });
  }

  return indexes;
}

export function getColIndexes(colOrigin: number): Array<IndexesType> {
  const indexes: Array<IndexesType> = [];

  for (let row = 0; row < 9; row++) {
    indexes.push({
      row,
      col: colOrigin,
    });
  }

  return indexes;
}

export function getNinePerNineIndexes(
  rowOrigin: number,
  colOrigin: number,
): Array<IndexesType> {
  const indexes: Array<IndexesType> = [];

  const rowStart = rowOrigin - (rowOrigin % 3);
  const rowEnd = rowStart + 3;
  const colStart = colOrigin - (colOrigin % 3);
  const colEnd = colStart + 3;

  for (let row = rowStart; row < rowEnd; row++) {
    for (let col = colStart; col < colEnd; col++) {
      indexes.push({ row, col });
    }
  }

  return indexes;
}

export function getHighlightedIndexes(
  rowOrigin: number,
  colOrigin: number,
): Array<IndexesType> {
  const rowIndexes = getRowIndexes(rowOrigin);
  const colIndexes = getColIndexes(colOrigin);
  const ninePerNineIndexes = getNinePerNineIndexes(rowOrigin, colOrigin);

  const highlightedIndexesWithDuplicated = [
    ...rowIndexes,
    ...colIndexes,
    ...ninePerNineIndexes,
  ];

  const highlightedIndexesUnique = [
    ...new Set(highlightedIndexesWithDuplicated),
  ];

  return highlightedIndexesUnique;
}

export function getAllRowsIndexes() {
  const rowsIndexes = CELL_VALUES.map(value => getRowIndexes(value - 1));

  return rowsIndexes;
}

export function getAllColsIndexes() {
  const colsIndexes = CELL_VALUES.map(value => getColIndexes(value - 1));

  return colsIndexes;
}

export function getAllBlocksIndexes() {
  const blocksIndexes: IndexesType[][] = [];
  const blocksBaseArray = [0, 3, 6];

  blocksBaseArray.forEach(row => {
    blocksBaseArray.forEach(col => {
      const block = getNinePerNineIndexes(row, col);
      blocksIndexes.push(block);
    });
  });

  return blocksIndexes;
}
