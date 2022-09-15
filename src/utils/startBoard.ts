import { CellType, IndexesType, Table } from 'src/model/cell';
import { createEmptyBoard } from './emptyBoard';
import {
  getAllBlocksIndexes,
  getAllColsIndexes,
  getAllRowsIndexes,
  getHighlightedIndexes,
} from './getIndexes';

type EasyLevels = 'easy' | 'medium' | 'hard';

const DIFFICULTY_INITIAL_FILLED: Record<EasyLevels, number> = {
  easy: 51,
  medium: 44,
  hard: 38,
};

export function overrideValue({
  table,
  row,
  col,
  value,
}: {
  table: Table;
  row: number;
  col: number;
  value: number;
}) {
  table[row][col].value = value;

  const highlightedIndexes = getHighlightedIndexes(row, col);

  highlightedIndexes.forEach(item => {
    table[item.row][item.col].remaining = table[item.row][
      item.col
    ].remaining.filter(valueRem => valueRem !== value);
  });
}

function fillUniqueValues(
  indexesArray: IndexesType[][],
  table: Table,
  onEachCell: (cell: CellType, remaining: number[]) => void,
) {
  let numberOfFilled = 0;

  indexesArray.forEach((indexes, index) => {
    const numberOfRemainingValues = Array.from({ length: 9 }, () => ({
      col: -1,
      times: 0,
    }));

    indexes.forEach(cellIndexes => {
      const cell = table[cellIndexes.row][cellIndexes.col];

      if (!cell.value) {
        const remaining = table[cellIndexes.row][cellIndexes.col].remaining;

        onEachCell(cell, remaining);
        remaining.forEach(rem => {
          numberOfRemainingValues[rem - 1].col = cellIndexes.col;
          numberOfRemainingValues[rem - 1].times++;
        });
      }
    });

    numberOfRemainingValues.forEach((remNumber, remNumberIndex) => {
      if (remNumber.times === 1 && !table[index][remNumber.col].value) {
        overrideValue({
          table,
          row: index,
          col: remNumber.col,
          value: remNumberIndex + 1,
        });

        numberOfFilled++;
      }
    });
  });

  return numberOfFilled;
}

export function fillRowsColsBlocks({
  table,
  onEachCell,
}: {
  table: Table;
  onEachCell: (cell: CellType, remaining: number[]) => void;
}): number {
  let numberOfFilled = 0;

  const blocksIndexes = getAllBlocksIndexes();
  const rowsIndexes = getAllRowsIndexes();
  const colsIndexes = getAllColsIndexes();

  numberOfFilled += fillUniqueValues(rowsIndexes, table, onEachCell);
  numberOfFilled += fillUniqueValues(colsIndexes, table, onEachCell);
  numberOfFilled += fillUniqueValues(blocksIndexes, table, onEachCell);

  return numberOfFilled;
}

export function startBoard({ level = 'easy' }: { level?: EasyLevels }): Table {
  const numberOfValuesToMantain = DIFFICULTY_INITIAL_FILLED[level];
  const numberOfValuesToRemove = 81 - numberOfValuesToMantain;
  const indexesToRemove: Array<IndexesType> = [];

  while (indexesToRemove.length < numberOfValuesToRemove) {
    const rowRandom = Math.floor(Math.random() * 9);
    const colRandom = Math.floor(Math.random() * 9);

    const newIndexToMantain = { row: rowRandom, col: colRandom };

    if (!indexesToRemove.includes(newIndexToMantain)) {
      indexesToRemove.push(newIndexToMantain);
    }
  }

  const newTable = resolveEmptyBoard();

  indexesToRemove.forEach(indexes => {
    newTable[indexes.row][indexes.col].value = 0;
  });

  return newTable;
}

export function resolveEmptyBoard(): Table {
  let table = createEmptyBoard();
  const numberOfValuesToFill = 81;
  const indexesToFill: Array<IndexesType> = [];

  table.forEach(row => {
    row.forEach(cell => {
      indexesToFill.push({ row: cell.row, col: cell.col });
    });
  });

  let numberOfFilled = 0;
  let error = false;
  let success = false;

  while (!success) {
    numberOfFilled = 0;
    error = false;
    table = createEmptyBoard();

    indexesToFill.forEach(indexes => {
      let hasNewNumberFilled = true;

      while (
        hasNewNumberFilled &&
        numberOfFilled < numberOfValuesToFill &&
        !error
      ) {
        hasNewNumberFilled = false;

        const onEachCell = (cell: CellType, remainingValues: number[]) => {
          if (remainingValues.length === 0 && !cell.value) {
            error = true;
          } else if (remainingValues.length === 1 && cell.value === 0) {
            overrideValue({
              table,
              row: cell.row,
              col: cell.col,
              value: remainingValues[0],
            });

            hasNewNumberFilled = true;

            numberOfFilled++;
          }
        };

        if (numberOfFilled < numberOfValuesToFill) {
          const filled = fillRowsColsBlocks({
            table,
            onEachCell,
          });

          numberOfFilled += filled;

          if (filled > 0) {
            hasNewNumberFilled = true;
          }
        }
      }

      if (
        table[indexes.row][indexes.col].value === 0 &&
        numberOfFilled < numberOfValuesToFill &&
        !error
      ) {
        const remainingValues = table[indexes.row][indexes.col].remaining;

        if (remainingValues.length > 0) {
          const randomIndexFromRemainingValues = Math.floor(
            Math.random() * remainingValues.length,
          );
          const randomValue = remainingValues[randomIndexFromRemainingValues];
          overrideValue({
            table,
            row: indexes.row,
            col: indexes.col,
            value: randomValue,
          });

          numberOfFilled++;
        }
      }
    });

    if (numberOfFilled === 81) {
      success = true;
    } else {
    }
  }

  return table;
}
