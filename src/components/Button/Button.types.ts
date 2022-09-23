export interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export type ButtonVariant = 'primary' | 'secondary';
