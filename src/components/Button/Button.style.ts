import { StyleSheet, ViewStyle } from 'react-native';
import { ButtonVariant } from './Button.types';

export const buttonVariantStyle: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: '#1040a5',
  },
  secondary: {
    backgroundColor: '#472783',
  },
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 4,
  },
  button: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff',
  },
});

export default styles;
