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
  buttonFullWidth: {
    flex: 1,
  },
  button: {
    borderRadius: 4,
    height: 45,
    flex: 0,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff',
  },
});

export default styles;
