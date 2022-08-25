import { CellType } from 'src/model/cell';
import {
  getColIndexes,
  getNinePerNineIndexes,
  getRowIndexes,
  IndexesType,
} from './getIndexes';

export const CELL_VALUES = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

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
  selectedCell,
}: {
  selectedCell: CellType;
  table: Array<Array<CellType>>;
}) {
  table.forEach(rowCells => {
    rowCells.forEach(cell => {
      if (cell.value === selectedCell.value) {
        cell.isEqualToSelected = true;
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
  newValue: string;
}) {
  table[selectedCell.row][selectedCell.col].value = newValue;
  showCellsErrorsOnSelect({
    row: selectedCell.row,
    col: selectedCell.col,
    table,
  });
  showCellsEqualToSelected({
    selectedCell: table[selectedCell.row][selectedCell.col],
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
  table[selectedCell.row][selectedCell.col].value = undefined;

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

  // updateRowCells({
  //   table,
  //   selectedCell,
  //   updateCell: showError,
  // });
  // updateColCells({
  //   table,
  //   selectedCell,
  //   updateCell: showError,
  // });
  // updateNinePerNineCells({
  //   table,
  //   selectedCell,
  //   updateCell: showError,
  // });
}

export function remainingValues({
  group,
}: {
  group: Array<CellType>;
}): Array<string> {
  const values = group.map(cell => cell.value || '-1');

  const remaining: Array<string> = [];

  values.forEach(value => {
    if (!CELL_VALUES.includes(value)) {
      remaining.push(value);
    }
  });

  return remaining;
}
