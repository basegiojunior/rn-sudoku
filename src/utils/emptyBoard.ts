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
        value: undefined,
        hasError: false,
        isEqualToSelected: false,
      });
    }
  }
  return cells;
}