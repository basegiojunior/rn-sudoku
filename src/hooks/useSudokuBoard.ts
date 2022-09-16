import { useMemo, useState } from 'react';
import { CellType, IndexesType, Table } from 'src/model/cell';
import { createEmptyBoard } from 'src/utils/emptyBoard';
import { getHighlightedIndexes } from 'src/utils/getIndexes';
import { startBoard } from 'src/utils/startBoard';

export const CELL_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const TABLE_TOTAL_CELLS = 81;

const useSudokuBoard = () => {
  const [table, setTable] = useState<Table>(createEmptyBoard());
  const [selectedCell, setSelectedCell] = useState<undefined | CellType>();
  const globalCompletedValues = useMemo(
    () => getCompletedValuesFromTable(),
    [table],
  );

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

          const highlightedIndexes = getHighlightedIndexes(cell.row, cell.col);
          highlightedIndexes.forEach((indexes: IndexesType) => {
            if (
              table[indexes.row][indexes.col].value === cell.value &&
              (cell.col !== indexes.col || cell.row !== indexes.row)
            ) {
              hasError = true;
              table[indexes.row][indexes.col].hasError = true;
            }
          });

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

  function getCompletedValuesFromTable(): Array<number> {
    const countValues: Record<number, number> = {};
    const completedValues: Array<number> = [];

    table.forEach(row => {
      row.forEach(({ value, hasError }) => {
        if (value && !hasError) {
          countValues[value] = countValues[value] ? countValues[value] + 1 : 1;

          if (countValues[value] === 9) {
            completedValues.push(value);
          }
        }
      });
    });

    return completedValues;
  }

  function onPressCell(rowIndex: number, colIndex: number) {
    const newTable = [...table];
    const cell = newTable[rowIndex][colIndex];

    clearSelectedCell();

    if (cell.selected) {
      setSelectedCell(undefined);
    } else {
      setSelectedCell(cell);
      selectCell({ cellToSelect: cell });
      setTable(newTable);
    }
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
    globalCompletedValues,
    newBoard,
    onPressActionCell,
    onPressCell,
  };
};

export default useSudokuBoard;