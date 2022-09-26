import { CELL_VALUES, TABLE_TOTAL_CELLS } from 'src/hooks/useSudokuBoard';
import { CellType, Table } from 'src/model/cell';
import { DifficultyLevels } from 'src/model/game';
import { createEmptyBoard } from './emptyBoard';
import { getHighlightedIndexes } from './getIndexes';
import { resolveBoard } from './resolveSudoku';

export function getRemainingValuesByIndex({
  table,
  row,
  col,
}: {
  table: Array<Array<CellType>>;
  row: number;
  col: number;
}): Array<number> {
  const highlightedIndexes = getHighlightedIndexes(row, col);

  const highlightedCells = highlightedIndexes.map(
    index => table[index.row][index.col],
  );

  const uniqueHighlightedValues = [
    ...new Set(highlightedCells.map(cell => cell.value)),
  ];
  const remainingValues = CELL_VALUES.filter(
    value => !uniqueHighlightedValues.includes(value),
  );

  return remainingValues;
}

const DIFFICULTY_INITIAL_FILLED: Record<DifficultyLevels, number> = {
  easy: 51,
  medium: 44,
  hard: 38,
};

export function startBoard({
  level = DifficultyLevels.EASY,
}: {
  level?: DifficultyLevels;
}): Table {
  const numberOfValuesToRemove =
    TABLE_TOTAL_CELLS - DIFFICULTY_INITIAL_FILLED[level];
  let countValuesRemoved = 0;

  const newTable = resolveEmptyBoard();

  while (countValuesRemoved < numberOfValuesToRemove) {
    const rowRandom = Math.floor(Math.random() * 9);
    const colRandom = Math.floor(Math.random() * 9);

    if (newTable[rowRandom][colRandom].value !== 0) {
      newTable[rowRandom][colRandom].value = 0;
      countValuesRemoved++;
    }
  }

  newTable.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell.value === 0) {
        newTable[rowIndex][colIndex].remaining = getRemainingValuesByIndex({
          table: newTable,
          row: rowIndex,
          col: colIndex,
        });
      }
    });
  });

  return newTable;
}

export function resolveEmptyBoard(): Table {
  const emptyTable = createEmptyBoard();
  const newTable = resolveBoard(emptyTable);
  return newTable;
}
