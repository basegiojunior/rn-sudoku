import { Table } from 'src/model/cell';

export function deepBoardCopy(table: Table): Table {
  const newTable: any[] = [];

  table.forEach((row, rowIndex) => {
    newTable.push([]);
    row.forEach(cell => {
      newTable[rowIndex].push({ ...cell });
    });
  });

  return newTable;
}
