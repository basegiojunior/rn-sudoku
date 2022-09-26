import { TABLE_TOTAL_CELLS } from 'src/hooks/useSudokuBoard';
import { Table } from 'src/model/cell';
import { DifficultyLevels } from 'src/model/game';
import { resolveEmptyBoard } from './resolveSudoku';

const DIFFICULTY_INITIAL_FILLED: Record<DifficultyLevels, number> = {
  easy: 51,
  medium: 44,
  hard: 38,
};

export function startBoard({
  level = DifficultyLevels.EASY,
}: {
  level?: DifficultyLevels;
}): Table {
  const numberOfValuesToRemove =
    TABLE_TOTAL_CELLS - DIFFICULTY_INITIAL_FILLED[level];
  let countValuesRemoved = 0;

  const newTable = resolveEmptyBoard();

  while (countValuesRemoved < numberOfValuesToRemove) {
    const rowRandom = Math.floor(Math.random() * 9);
    const colRandom = Math.floor(Math.random() * 9);

    if (newTable[rowRandom][colRandom].value !== 0) {
      newTable[rowRandom][colRandom].value = 0;
      countValuesRemoved++;
    }
  }

  return newTable;
}
