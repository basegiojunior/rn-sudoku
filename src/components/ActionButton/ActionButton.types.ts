export interface ActionButtonProps {
  value: number;
  onPress: () => void;
  variant: ActionButtonVariant;
  disabled?: boolean;
}

export type ActionButtonVariant = 'valueOption';
