import { StyleSheet } from 'react-native';
import { colors } from 'src/styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  gameTitle: {
    fontWeight: 'bold',
    fontSize: 40,
    color: colors.black[800],
    marginBottom: 50,
  },
  selectorContainer: {
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 8,
    flexDirection: 'row',
  },
});

export default styles;
