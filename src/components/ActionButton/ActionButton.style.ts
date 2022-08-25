import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    width: Dimensions.get('screen').width / 9,
    alignItems: 'center',
  },
  valueOptionText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#29475f',
  },
  valueOptionTextDisabled: {
    color: '#4f5d68',
  },
});

export default styles;
