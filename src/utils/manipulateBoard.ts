import { CellType, IndexesType, Table } from 'src/model/cell';
import { getHighlightedIndexes } from './getIndexes';

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
  value: number;
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
  const highlightCell = ({ row, col }: IndexesType) => {
    table[row][col].highlighted = true;
  };

  getHighlightedIndexes(selectedCell.row, selectedCell.col).forEach(
    highlightCell,
  );

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

  const valuesToVerify = [oldValue, newValue].filter(value => value !== 0);

  verifyErrors({ table, valuesToVerify });

  verifyCellsEqualToSelected({
    value: newValue,
    table,
  });
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
