import { CellType } from 'src/model/cell';

export interface CellProps {
  cell: CellType;
  onPress: (rowIndex: number, colIndex: number) => void;
  rowIndex: number;
  colIndex: number;
  hasError: boolean;
  isEqualToSelected: boolean;
  valuesTest?: Array<number>;
}
