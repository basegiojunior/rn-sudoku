export interface ActionButtonProps {
  value: string;
  onPress: () => void;
  variant: ActionButtonVariant;
  disabled?: boolean;
}

export type ActionButtonVariant = 'valueOption';
