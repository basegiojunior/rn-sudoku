export interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
}

export type ButtonVariant = 'primary' | 'secondary';
