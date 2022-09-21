import React, { createContext, useContext, useState } from 'react';
import { Table } from 'src/model/cell';
import { DifficultyLevels } from 'src/model/game';
import { createEmptyBoard } from 'src/utils/emptyBoard';
import { startBoard } from 'src/utils/startBoard';

type GameContextProps = {
  table: Table;
  difficultySelected: number;
  changeTable: (table: Table) => void;
  changeDifficultyIndex: (index: number) => void;
  newGame: () => void;
};

const DEFAULT_VALUE: GameContextProps = {} as GameContextProps;

const GameContext = createContext(DEFAULT_VALUE);

export const GameContextProvider: React.FC<{
  children: React.ReactElement;
}> = props => {
  const [table, setTable] = useState<Table>(createEmptyBoard());
  const [difficultySelected, setDifficultySelected] = useState(0);

  function changeTable(newTable: Table) {
    setTable(newTable);
  }

  function changeDifficultyIndex(index: number) {
    setDifficultySelected(index);
  }

  function newGame() {
    const newTable = startBoard({
      level: Object.values(DifficultyLevels)[difficultySelected],
    });

    changeTable(newTable);
  }

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
