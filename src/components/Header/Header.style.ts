import { StyleSheet } from 'react-native';
import { colors } from 'src/styles/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: 55,
    width: '100%',
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
