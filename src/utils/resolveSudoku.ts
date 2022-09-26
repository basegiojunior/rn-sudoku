import { TABLE_TOTAL_CELLS } from 'src/hooks/useSudokuBoard';
import { IndexesType, Table } from 'src/model/cell';
import { createEmptyBoard } from './emptyBoard';
import {
  getAllBlocksIndexes,
  getAllColsIndexes,
  getAllRowsIndexes,
  getHighlightedIndexes,
} from './getIndexes';
import { deepBoardCopy } from './object';

export function overrideValue(
  table: Table,
  row: number,
  col: number,
  value: number,
) {
  table[row][col].value = value;
  table[row][col].valueSolved = value;

  const highlightedIndexes = getHighlightedIndexes(row, col);

  highlightedIndexes.forEach(item => {
    table[item.row][item.col].remaining = table[item.row][
      item.col
    ].remaining.filter(valueRem => valueRem !== value);
  });
}

function fillUniqueValues(indexesArray: IndexesType[][], table: Table) {
  let numberOfFilled = 0;

  indexesArray.forEach(group => {
    const countRemaining = Array.from({ length: 9 }, () => ({
      col: -1,
      row: -1,
      count: 0,
    }));

    group.forEach(({ col, row }) => {
      const cell = table[row][col];

      if (!cell.value) {
        const remaining = table[row][col].remaining;

        if (remaining.length === 1) {
          overrideValue(table, row, col, remaining[0]);
          numberOfFilled++;
        }

        remaining.forEach(rem => {
          countRemaining[rem - 1] = {
            col,
            row,
            count: countRemaining[rem - 1].count + 1,
          };
        });
      }
    });

    countRemaining.forEach(({ count, row, col }, remNumberIndex) => {
      if (count === 1 && !table[row][col].value) {
        overrideValue(table, row, col, remNumberIndex + 1);

        numberOfFilled++;
      }
    });
  });

  return numberOfFilled;
}

export function fillRowsColsBlocks({ table }: { table: Table }): number {
  let numberOfFilled = 0;

  const blocksIndexes = getAllBlocksIndexes();
  const rowsIndexes = getAllRowsIndexes();
  const colsIndexes = getAllColsIndexes();

  numberOfFilled += fillUniqueValues(rowsIndexes, table);
  numberOfFilled += fillUniqueValues(colsIndexes, table);
  numberOfFilled += fillUniqueValues(blocksIndexes, table);

  return numberOfFilled;
}

export function resolveEmptyBoard(): Table {
  let success = false;
  let table: Table = [[]];

  while (!success) {
    let numberOfFilled = 0;
    table = createEmptyBoard();

    table.forEach(rowCells => {
      rowCells.forEach(({ row, col }) => {
        let hasNewNumberFilled = true;

        while (hasNewNumberFilled && numberOfFilled < TABLE_TOTAL_CELLS) {
          const iterationFilled = fillRowsColsBlocks({
            table,
          });

          numberOfFilled += iterationFilled;

          if (iterationFilled === 0) {
            hasNewNumberFilled = false;
          }
        }

        if (table[row][col].value === 0 && numberOfFilled < TABLE_TOTAL_CELLS) {
          const remainingValues = table[row][col].remaining;

          if (remainingValues.length > 0) {
            const randomIndexFromRemainingValues = Math.floor(
              Math.random() * remainingValues.length,
            );
            const randomValue = remainingValues[randomIndexFromRemainingValues];
            overrideValue(table, row, col, randomValue);

            numberOfFilled++;
          }
        }
      });
    });

    if (numberOfFilled === 81) {
      success = true;
    }
  }

  return table;
}
