import { CellType, IndexesType } from 'src/model/cell';
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

  getRowIndexes(selectedCell.row).forEach(updateCell);
  getColIndexes(selectedCell.col).forEach(updateCell);
  getNinePerNineIndexes(selectedCell.row, selectedCell.col).forEach(updateCell);
}

export function showCellsErrorsOnSelect({
  table,
  row,
  col,
}: {
  row: number;
  col: number;
  table: Array<Array<CellType>>;
}) {
  let hasError = false;
  const selectedCell = table[row][col];

  const verifyErrorCells = (indexes: IndexesType) => {
    if (
      selectedCell.value &&
      table[indexes.row][indexes.col].value === selectedCell.value &&
      (col !== indexes.col || row !== indexes.row)
    ) {
      hasError = true;
      table[indexes.row][indexes.col].hasError = true;
    }
  };

  getRowIndexes(selectedCell.row).forEach(verifyErrorCells);
  getColIndexes(selectedCell.col).forEach(verifyErrorCells);
  getNinePerNineIndexes(selectedCell.row, selectedCell.col).forEach(
    verifyErrorCells,
  );

  if (hasError) {
    table[selectedCell.row][selectedCell.col].hasError = true;
  }
}

export function showCellsEqualToSelected({
  table,
  value,
}: {
  value: number;
  table: Array<Array<CellType>>;
}) {
  table.forEach(row => {
    row.forEach(cell => {
      if (cell.value === value) {
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
  showCellsEqualToSelected({
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
  table[selectedCell.row][selectedCell.col].value = newValue;
  showCellsErrorsOnSelect({
    row: selectedCell.row,
    col: selectedCell.col,
    table,
  });
  showCellsEqualToSelected({
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
  table[selectedCell.row][selectedCell.col].value = 0;

  table.forEach((_, rowIndex) => {
    table[rowIndex].forEach((__, colIndex) => {
      table[rowIndex][colIndex].hasError = false;
    });
  });

  const showError = ({ row, col }: IndexesType) => {
    showCellsErrorsOnSelect({ table, row, col });
  };

  getRowIndexes(selectedCell.row).forEach(showError);
  getColIndexes(selectedCell.col).forEach(showError);
  getNinePerNineIndexes(selectedCell.row, selectedCell.col).forEach(showError);
}

export function getRemainingValues({
  table,
}: {
  table: Array<Array<CellType>>;
}): Array<number> {
  const correctNumberOfValues: Array<number> = Array.from(
    { length: 9 },
    () => 0,
  );

  table.forEach(row => {
    row.forEach(cell => {
      if (cell.value && !cell.hasError) {
        correctNumberOfValues[cell.value - 1]++;
      }
    });
  });

  return correctNumberOfValues;
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
