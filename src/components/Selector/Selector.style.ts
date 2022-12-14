import { StyleSheet } from 'react-native';
import { colors } from 'src/styles/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    maxHeight: 40,
  },
  scrollContent: {
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: colors.black[900],
    fontWeight: 'bold',
  },
});

export default styles;
