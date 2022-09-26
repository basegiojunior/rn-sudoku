import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'src/styles/colors';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.black.alpha40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '85%',
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
    borderRadius: 12,
  },
});

export default styles;
