import { CellType, IndexesType, Table } from 'src/model/cell';
import { createEmptyBoard } from './emptyBoard';
import { getHighlightedIndexes } from './getIndexes';

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

export function fillRowsUniqueValues({
  table,
  onEachCell,
}: {
  table: Table;
  onEachCell: (cell: CellType, remaining: number[]) => void;
}): number {
  let numberOfFilled = 0;

  for (let row = 0; row < 9; row++) {
    const numberOfRemainingValues = Array.from({ length: 9 }, () => ({
      col: -1,
      times: 0,
    }));

    table[row].forEach((cell, col) => {
      if (!cell.value) {
        const remaining = table[row][col].remaining;

        onEachCell(cell, remaining);
        remaining.forEach(rem => {
          numberOfRemainingValues[rem - 1].col = col;
          numberOfRemainingValues[rem - 1].times++;
        });
      }
    });

    numberOfRemainingValues.forEach((remNumber, remNumberIndex) => {
      if (remNumber.times === 1 && !table[row][remNumber.col].value) {
        overrideValue({
          table,
          row,
          col: remNumber.col,
          value: remNumberIndex + 1,
        });

        numberOfFilled++;
      }
    });
  }

  return numberOfFilled;
}

export function fillColumsUniqueValues({
  table,
  onEachCell,
}: {
  table: Array<Array<CellType>>;
  onEachCell: (cell: CellType, remaining: number[]) => void;
}): number {
  let numberOfFilled = 0;

  for (let col = 0; col < 9; col++) {
    const numberOfRemainingValues = Array.from({ length: 9 }, () => ({
      row: -1,
      times: 0,
    }));

    for (let row = 0; row < 9; row++) {
      if (!table[row][col].value) {
        const remaining = table[row][col].remaining;

        onEachCell(table[row][col], remaining);

        remaining.forEach(rem => {
          numberOfRemainingValues[rem - 1].row = row;
          numberOfRemainingValues[rem - 1].times++;
        });
      }
    }

    numberOfRemainingValues.forEach((remNumber, remNumberIndex) => {
      if (remNumber.times === 1 && !table[remNumber.row][col].value) {
        overrideValue({
          table,
          row: remNumber.row,
          col,
          value: remNumberIndex + 1,
        });
        numberOfFilled++;
      }
    });
  }

  return numberOfFilled;
}

export function fillNinePerNineUniqueValues({
  table,
  onEachCell,
}: {
  table: Array<Array<CellType>>;
  onEachCell: (cell: CellType, remaining: number[]) => void;
}): number {
  let numberOfFilled = 0;
  const ninePerNineIndexes = [
    [0, 0],
    [0, 3],
    [0, 6],
    [3, 0],
    [3, 3],
    [3, 6],
    [6, 0],
    [6, 3],
    [6, 6],
  ];

  ninePerNineIndexes.forEach(item => {
    const rowStart = item[0] - (item[0] % 3);
    const rowEnd = rowStart + 3;
    const colStart = item[1] - (item[1] % 3);
    const colEnd = colStart + 3;

    const numberOfRemainingValues = Array.from({ length: 9 }, () => ({
      row: -1,
      col: -1,
      times: 0,
    }));

    for (let row = rowStart; row < rowEnd; row++) {
      for (let col = colStart; col < colEnd; col++) {
        if (!table[row][col].value) {
          const remaining = table[row][col].remaining;
          onEachCell(table[row][col], remaining);
          remaining.forEach(rem => {
            numberOfRemainingValues[rem - 1].col = col;
            numberOfRemainingValues[rem - 1].row = row;
            numberOfRemainingValues[rem - 1].times++;
          });
        }
      }
    }

    numberOfRemainingValues.forEach((remNumber, remNumberIndex) => {
      if (remNumber.times === 1 && !table[remNumber.row][remNumber.col].value) {
        overrideValue({
          table,
          row: remNumber.row,
          col: remNumber.row,
          value: remNumberIndex + 1,
        });
        numberOfFilled++;
      }
    });
  });

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
          const rowsFilled = fillRowsUniqueValues({
            table,
            onEachCell,
          });
          const columnsFilled = fillColumsUniqueValues({ table, onEachCell });
          const squareFilled = fillNinePerNineUniqueValues({
            table,
            onEachCell,
          });
          numberOfFilled += rowsFilled + columnsFilled + squareFilled;

          if (rowsFilled + columnsFilled + squareFilled > 0) {
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
