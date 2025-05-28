import { ActivityIndicator, StyleSheet, View } from 'react-native';


interface IUILoaderProps {
  isLoading?: boolean,
}

export const UILoader = (props: IUILoaderProps) => {
  const {
    isLoading,
  } = props;

  return (
    <View
      style={isLoading
        ? styles.loaderContainer
        : {...styles.loaderContainer, ...styles.loaderContainerHidden}
      }
    >
      <View style={styles.loaderContainerBg}></View>
      <ActivityIndicator
        style={styles.loader}
        size="large"
        color="#1aa3ff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    justifyContent: 'center',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  loaderContainerHidden: {
    display: 'none',
  },
  loaderContainerBg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgrey',
    opacity: 0.5,
  },
  loader: {
    position: 'relative',
  },
});
