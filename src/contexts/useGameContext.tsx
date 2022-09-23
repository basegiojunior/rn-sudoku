import React, { createContext, useContext, useEffect, useState } from 'react';
import { Table } from 'src/model/cell';
import { DifficultyLevels } from 'src/model/game';
import { getItem, setItem, STORAGE_KEYS } from 'src/storage/asyncStorage';
import { startBoard } from 'src/utils/startBoard';

type GameContextProps = {
  table: Table;
  difficultySelected: DifficultyLevels;
  changeTable: (table: Table) => void;
  changeDifficultyIndex: (difficulty: DifficultyLevels) => void;
  newGame: () => void;
};

const DEFAULT_VALUE: GameContextProps = {} as GameContextProps;

const GameContext = createContext(DEFAULT_VALUE);

export const GameContextProvider: React.FC<{
  children: React.ReactElement;
}> = props => {
  const [table, setTable] = useState<Table>([[]]);
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
        changeTable,
        newGame,
        changeDifficultyIndex,
        difficultySelected,
      }}>
      {props.children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
