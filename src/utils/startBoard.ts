import { CellType, IndexesType, Table } from 'src/model/cell';
import {
  getRemainingValuesByIndex,
  removeRemainingValueByIndex,
} from './manipulateBoard';

function overrideValue({
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
  removeRemainingValueByIndex({
    table,
    row,
    col,
    value,
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

export function startBoard({
  table,
  numberOfValuesToFill = 81,
}: {
  table: Array<Array<CellType>>;
  numberOfValuesToFill?: number;
}): number {
  const indexesToFill: Array<IndexesType> = [];

  table.forEach(row => {
    row.forEach(cell => {
      indexesToFill.push({ row: cell.row, col: cell.col });
    });
  });

  let numberOfFilled = 0;
  let error = false;

  indexesToFill.forEach((indexes, indexesIndex) => {
    let hasNewNumberFilled = true;

    while (hasNewNumberFilled) {
      hasNewNumberFilled = false;

      const onEachCell = (cell: CellType, remainingValues: number[]) => {
        if (remainingValues.length === 0 && !cell.value) {
          numberOfFilled = 81;
          error = true;
        } else if (remainingValues.length === 1 && cell.value === 0) {
          table[cell.row][cell.col].value = remainingValues[0];

          removeRemainingValueByIndex({
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
        const squareFilled = fillNinePerNineUniqueValues({ table, onEachCell });
        numberOfFilled += rowsFilled + columnsFilled + squareFilled;

        if (rowsFilled + columnsFilled + squareFilled > 0) {
          hasNewNumberFilled = true;
        }
      }
    }

    if (
      table[indexes.row][indexes.col].value === 0 &&
      numberOfFilled < numberOfValuesToFill
    ) {
      const remainingValues = table[indexes.row][indexes.col].remaining;

      if (remainingValues.length > 0) {
        const randomIndexFromRemainingValues = Math.floor(
          Math.random() * remainingValues.length,
        );
        const randomValue = remainingValues[randomIndexFromRemainingValues];
        table[indexes.row][indexes.col].value = randomValue;

        removeRemainingValueByIndex({
          table,
          row: indexes.row,
          col: indexes.col,
          value: randomValue,
        });

        numberOfFilled += 1;
      }
    }
  });

  if (error) {
    return 0;
  }

  return numberOfFilled;
}
