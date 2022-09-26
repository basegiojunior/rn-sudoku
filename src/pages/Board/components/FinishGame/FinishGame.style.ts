import { StyleSheet } from 'react-native';
import { colors } from 'src/styles/colors';

const styles = StyleSheet.create({
  newGameButtonContainer: {
    marginTop: 32,
    flexDirection: 'row',
  },
  spaceBetweenButtons: {
    width: 16,
  },
  text: {
    color: colors.black[800],
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 35,
  },
});

export default styles;
