import { useState } from 'react';
import { CellType, IndexesType, Table } from 'src/model/cell';
import { createEmptyBoard } from './emptyBoard';
import { getHighlightedIndexes } from './getIndexes';
import { startBoard } from './startBoard';

export const CELL_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const useSudokuBoard = () => {
  const [table, setTable] = useState<Table>(createEmptyBoard());
  const [selectedCell, setSelectedCell] = useState<undefined | CellType>();

  function clearSelectedCell() {
    table.forEach(line => {
      line.forEach(cell => {
        cell.selected = false;
        cell.highlighted = false;
        cell.isEqualToSelected = false;
      });
    });
  }

  function verifyErrors({
    valuesToVerify = CELL_VALUES,
  }: {
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

  function verifyCellsEqualToSelected({ value }: { value: number }) {
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

  function selectCell({ cellToSelect }: { cellToSelect: CellType }) {
    const highlightCell = ({ row, col }: IndexesType) => {
      table[row][col].highlighted = true;
    };

    getHighlightedIndexes(cellToSelect.row, cellToSelect.col).forEach(
      highlightCell,
    );

    verifyCellsEqualToSelected({
      value: cellToSelect.value,
    });
    table[cellToSelect.row][cellToSelect.col].selected = true;
    table[cellToSelect.row][cellToSelect.col].highlighted = false;
  }

  function fillCellValue({ newValue }: { newValue: number }) {
    if (selectedCell) {
      const oldValue = selectedCell.value;
      table[selectedCell.row][selectedCell.col].value = newValue;

      const valuesToVerify = [oldValue, newValue].filter(value => value !== 0);

      verifyErrors({ valuesToVerify });

      verifyCellsEqualToSelected({
        value: newValue,
      });
    }
  }

  function getRemainingValuesFromTable(): Array<number> {
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

  function onPressCell(rowIndex: number, colIndex: number) {
    const newTable = [...table];
    if (newTable[rowIndex][colIndex].selected) {
      clearSelectedCell();
      setSelectedCell(undefined);
      return;
    }

    setSelectedCell(newTable[rowIndex][colIndex]);

    clearSelectedCell();
    selectCell({ cellToSelect: newTable[rowIndex][colIndex] });
    setTable(newTable);
  }

  function newBoard() {
    const newTable = startBoard({ level: 'hard' });

    setTable(newTable);
  }

  function onPressActionCell(cellValue: number) {
    if (selectedCell) {
      const newTable = [...table];
      const newValue = selectedCell?.value === cellValue ? 0 : cellValue;

      fillCellValue({
        newValue,
      });
      setTable(newTable);
      setSelectedCell({ ...selectedCell, value: newValue });
    }
  }

  return {
    table,
    newBoard,
    onPressActionCell,
    onPressCell,
    getRemainingValuesFromTable,
  };
};

export default useSudokuBoard;
