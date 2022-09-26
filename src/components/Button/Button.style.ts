import { StyleSheet, ViewStyle } from 'react-native';
import { colors } from 'src/styles/colors';
import { ButtonVariant } from './Button.types';

export const buttonVariantStyle: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.blue[500],
  },
  secondary: {
    backgroundColor: colors.purple[400],
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
    color: colors.white,
  },
});

export default styles;
