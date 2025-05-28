import { StyleSheet, Text, TextInput, View } from 'react-native';


interface IUILabelProps {
  placeholder?: string,
  errorText?: string,
  onChangeText: (value: string) => void,
}

export const UILabel = (props: IUILabelProps) => {
  const {
    placeholder,
    errorText,
    onChangeText,
  } = props;

  return (
    <View style={styles.inputLabel}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
      {errorText && <Text style={styles.inputNotification}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    borderRadius: 12,
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 30,
    paddingLeft: 10,
    backgroundColor: '#ff9edf',
  },
  input: {
    borderRadius: 4,
    padding: 10,
    height: 44,
    backgroundColor: '#FFFFFF',
  },
  inputNotification: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    fontSize: 16,
    color: '#FFFFFF',
  },
});
