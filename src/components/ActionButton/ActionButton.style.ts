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
    color: '#384653',
  },
  valueOptionTextDisabled: {
    color: '#b2bec9',
  },
});

export default styles;
