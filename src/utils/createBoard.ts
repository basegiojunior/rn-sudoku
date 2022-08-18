import { CellType } from 'src/model/cell';

export function createEmptyBoard(): Array<Array<CellType>> {
  const cells: Array<Array<CellType>> = [];
  for (let row = 0; row < 9; row++) {
    cells.push([]);
    for (let col = 0; col < 9; col++) {
      cells[row].push({
        col,
        row,
        highlighted: false,
        selected: false,
        value: 1,
      });
    }
  }
  return cells;
}

export function selectLine({
  row,
  table,
}: {
  row: number;
  table: Array<Array<CellType>>;
}) {
  table[row].forEach(cell => {
    cell.highlighted = true;
  });
}

export function selectCol({
  col,
  table,
}: {
  col: number;
  table: Array<Array<CellType>>;
}) {
  table.forEach((line, index) => {
    table[index][col].highlighted = true;
  });
}

export function selectGroup({
  row,
  col,
  table,
}: {
  row: number;
  col: number;
  table: Array<Array<CellType>>;
}) {
  const rowStart = row - (row % 3);
  const rowEnd = rowStart + 3;
  const colStart = col - (col % 3);
  const colEnd = colStart + 3;

  for (let i = rowStart; i < rowEnd; i++) {
    for (let j = colStart; j < colEnd; j++) {
      table[i][j].highlighted = true;
    }
  }

  table[row][col].highlighted = false;
  table[row][col].selected = true;
}

export function clear({ table }: { table: Array<Array<CellType>> }) {
  table.forEach(line => {
    line.forEach(cell => {
      cell.selected = false;
      cell.highlighted = false;
    });
  });
}
