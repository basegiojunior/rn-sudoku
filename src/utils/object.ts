import { Table } from 'src/model/cell';

export function deepBoardCopy(table: Table): Table {
  const newTable: Table = Array.from({ length: 9 }, () => []);

  table.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      newTable[rowIndex][cellIndex] = { ...cell };
    });
  });

  return newTable;
}
