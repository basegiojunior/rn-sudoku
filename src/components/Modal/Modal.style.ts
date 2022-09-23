import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '85%',
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
  },
});

export default styles;
