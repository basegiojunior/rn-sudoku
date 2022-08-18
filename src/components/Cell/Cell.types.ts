import { CellType } from '../../model/cell';

export interface CellProps {
  cell: CellType;
  onPress: (rowIndex: number, colIndex: number) => void;
  rowIndex: number;
  colIndex: number;
}
