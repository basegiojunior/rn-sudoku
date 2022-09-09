export type CellType = {
  row: number;
  col: number;
  selected: boolean;
  highlighted: boolean;
  hasError: boolean;
  isEqualToSelected: boolean;
  value: number;
};

export type IndexesType = {
  row: number;
  col: number;
};
