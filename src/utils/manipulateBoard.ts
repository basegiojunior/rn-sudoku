import { CellType, IndexesType, Table } from 'src/model/cell';
import {
  getColIndexes,
  getHighlightedIndexes,
  getNinePerNineIndexes,
  getRowIndexes,
} from './getIndexes';

export const CELL_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function clearSelectedCell({
  table,
}: {
  table: Array<Array<CellType>>;
}) {
  table.forEach(line => {
    line.forEach(cell => {
      cell.selected = false;
      cell.highlighted = false;
      cell.isEqualToSelected = false;
    });
  });
}

export function highlightOnSelected({
  table,
  selectedCell,
}: {
  selectedCell: CellType;
  table: Array<Array<CellType>>;
}) {
  const updateCell = ({ row, col }: IndexesType) => {
    table[row][col].highlighted = true;
  };

  getHighlightedIndexes(selectedCell.row, selectedCell.col).forEach(updateCell);
}

export function verifyErrors({
  table,
  valuesToVerify = CELL_VALUES,
}: {
  table: Table;
  valuesToVerify?: Array<number>;
}) {
  table.forEach(row => {
    row.forEach(cell => {
      if (valuesToVerify.includes(cell.value)) {
        let hasError = false;

        const verifyErrorCell = (indexes: IndexesType) => {
          if (
            table[indexes.row][indexes.col].value === cell.value &&
            (cell.col !== indexes.col || cell.row !== indexes.row)
          ) {
            hasError = true;
            table[indexes.row][indexes.col].hasError = true;
          }
        };

        const highlightedIndexes = getHighlightedIndexes(cell.row, cell.col);
        highlightedIndexes.forEach(verifyErrorCell);

        if (hasError) {
          table[cell.row][cell.col].hasError = true;
        } else {
          table[cell.row][cell.col].hasError = false;
        }
      }
    });
  });
}

export function verifyCellsEqualToSelected({
  table,
  value,
}: {
  value?: number;
  table: Array<Array<CellType>>;
}) {
  table.forEach(row => {
    row.forEach(cell => {
      if (value && cell.value === value) {
        cell.isEqualToSelected = true;
      } else {
        cell.isEqualToSelected = false;
      }
    });
  });
}

export function selectCell({
  table,
  selectedCell,
}: {
  selectedCell: CellType;
  table: Array<Array<CellType>>;
}) {
  highlightOnSelected({ selectedCell, table });
  verifyCellsEqualToSelected({
    value: selectedCell.value,
    table,
  });
  table[selectedCell.row][selectedCell.col].selected = true;
  table[selectedCell.row][selectedCell.col].highlighted = false;
}

export function fillCellValue({
  table,
  selectedCell,
  newValue,
}: {
  selectedCell: CellType;
  table: Array<Array<CellType>>;
  newValue: number;
}) {
  const oldValue = selectedCell.value;
  table[selectedCell.row][selectedCell.col].value = newValue;

  const valuesToVerify = [newValue];
  if (oldValue) {
    valuesToVerify.push(oldValue);
  }

  verifyErrors({ table, valuesToVerify });

  verifyCellsEqualToSelected({
    value: newValue,
    table,
  });
}

export function clearCellValue({
  table,
  selectedCell,
}: {
  selectedCell: CellType;
  table: Array<Array<CellType>>;
}) {
  const oldValue = selectedCell.value;
  table[selectedCell.row][selectedCell.col].value = 0;

  verifyErrors({ table, valuesToVerify: [oldValue] });

  verifyCellsEqualToSelected({ table });
}

export function getRemainingValuesFromTable({
  table,
}: {
  table: Array<Array<CellType>>;
}): Array<number> {
  const correctNumberOfValues: Array<number> = Array.from(
    { length: 9 },
    () => 0,
  );

  const completeValues: Array<number> = [];

  table.forEach(row => {
    row.forEach(cell => {
      if (cell.value && !cell.hasError) {
        correctNumberOfValues[cell.value - 1]++;

        if (correctNumberOfValues[cell.value - 1] === 9) {
          completeValues.push(cell.value);
        }
      }
    });
  });

  const remainingValues = CELL_VALUES.filter(
    value => !completeValues.includes(value),
  );

  return remainingValues;
}

export function removeRemainingValueByIndex({
  table,
  row,
  col,
  value,
}: {
  table: Array<Array<CellType>>;
  row: number;
  col: number;
  value: number;
}) {
  const highlightedIndexes = getHighlightedIndexes(row, col);

  highlightedIndexes.forEach(item => {
    table[item.row][item.col].remaining = table[item.row][
      item.col
    ].remaining.filter(valueRem => valueRem !== value);
  });
}

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
  removeRemainingValueByIndex({
    table,
    row,
    col,
    value,
  });
}
