import { Dimensions, StyleSheet } from 'react-native';
import { colors } from 'src/styles/colors';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    width: Dimensions.get('screen').width / 9,
    alignItems: 'center',
  },
  valueOptionText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colors.blue[800],
  },
  valueOptionTextDisabled: {
    color: colors.black[100],
  },
});

export default styles;
