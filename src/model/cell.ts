export type CellType = {
  row: number;
  col: number;
  selected: boolean;
  highlighted: boolean;
  hasError: boolean;
  isEqualToSelected: boolean;
  value: number;
  valueSolved: number;
  remaining: number[];
};

export type IndexesType = {
  row: number;
  col: number;
};

export type Table = Array<Array<CellType>>;
