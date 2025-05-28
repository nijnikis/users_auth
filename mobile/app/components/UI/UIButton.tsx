import { PropsWithChildren } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


interface IUIButtonProps {
  disabled?: boolean,
  onPress: () => void,
}

export const UIButton = (props: PropsWithChildren<IUIButtonProps>) => {
  const {
    children,
    disabled,
    onPress,
  } = props;

  return (
    <TouchableOpacity
      style={disabled ? {...styles.action, ...styles.actionDisabled} : styles.action}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.actionText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  action: {
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#1aa3ff',
  },
  actionDisabled: {
    backgroundColor: 'lightgrey',
  },
  actionText: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
