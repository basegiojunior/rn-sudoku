export interface SelectorProps {
  onPressRight: () => void;
  onPressLeft: () => void;
  items: string[];
  translateItem: (item: any) => string;
  itemIndexSelected: number;
}
