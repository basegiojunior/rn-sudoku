export interface SelectorProps<T> {
  onChange: (newValue: T) => void;
  items: T[];
  translateItem: (item: T) => string;
  itemSelected: T;
}
