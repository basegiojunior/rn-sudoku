export type CellType = {
  row: number;
  col: number;
  selected: boolean;
  highlighted: boolean;
  hasError: boolean;
  isEqualToSelected: boolean;
  value?: string;
};
