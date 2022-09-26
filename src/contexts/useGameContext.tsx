import React, { createContext, useContext, useEffect, useState } from 'react';
import { Table } from 'src/model/cell';
import { DifficultyLevels } from 'src/model/game';
import { getItem, setItem, STORAGE_KEYS } from 'src/storage/asyncStorage';
import { getRowIndexes } from 'src/utils/getIndexes';
import { startBoard } from 'src/utils/startBoard';

type GameContextProps = {
  table: Table;
  difficultySelected: DifficultyLevels;
  changeTable: (table: Table) => void;
  changeDifficultyIndex: (difficulty: DifficultyLevels) => void;
  newGame: () => void;
  solveSudoku: () => void;
  changeWon: (newWon: boolean) => void;
  won: boolean;
};

const DEFAULT_VALUE: GameContextProps = {} as GameContextProps;

const GameContext = createContext(DEFAULT_VALUE);

export const GameContextProvider: React.FC<{
  children: React.ReactElement;
}> = props => {
  const [table, setTable] = useState<Table>([[]]);
  const [won, setWon] = useState<boolean>(false);
  const [difficultySelected, setDifficultySelected] = useState(
    DifficultyLevels.EASY,
  );

  function changeTable(newTable: Table) {
    setTable(newTable);
    setItem(STORAGE_KEYS.BOARD, newTable);
  }

  function changeDifficultyIndex(difficulty: DifficultyLevels) {
    setDifficultySelected(difficulty);
  }

  async function newGame() {
    const newTable = startBoard({
      level: difficultySelected,
    });
    setTable(newTable);

    try {
      await setItem(STORAGE_KEYS.BOARD, newTable);
    } catch (error) {
      throw error;
    }
  }

  function solveSudoku() {
    const newTable = [...table];
    table.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        newTable[rowIndex][colIndex].value = cell.valueSolved;
      });
    });

    changeTable(newTable);
  }

  function changeWon(newWon: boolean) {
    setWon(newWon);
  }

  useEffect(() => {
    const getGameStored = async () => {
      try {
        const storedGame = await getItem(STORAGE_KEYS.BOARD);
        setTable(storedGame);
      } catch {
        newGame();
      }
    };

    getGameStored();
  }, []);

  return (
    <GameContext.Provider
      value={{
        table,
        won,
        changeTable,
        solveSudoku,
        newGame,
        changeWon,
        changeDifficultyIndex,
        difficultySelected,
      }}>
      {props.children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
