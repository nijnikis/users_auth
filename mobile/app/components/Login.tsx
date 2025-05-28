import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { UIButton } from './UI/UIButton';
import { UILabel } from './UI/UILabel';
import { UILoader } from './UI/UILoader';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { login, getUsers } = useAuth();

  const loadUsers  = async () => {
    setIsLoading(true);
    const response  = await getUsers!();
    if (!response) {
      alert('getUsers no response');
    } else {
      if (response.error) {
        alert(response.message);
      }
    }
    setIsLoading(false);
  };
  
  useEffect(() => setIsFormValid(!!(email && password)), [email, password]);

  const handleOnClickLogin  = async () => {
    setIsLoading(true);
    const response  = await login!(email, password);
    if (!response) {
      alert('login no response');
    } else {
      if (response.error) {
        alert(response.message);
      } else {
        alert('Welcome!');
        await loadUsers();
      }
    }
    setIsLoading(false);
  }

  const handleOnChangeEmail = (value: string) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value: string) => {
    setPassword(value);
  };

  return (
    <View style={styles.container}>
      <UILoader isLoading={isLoading} />
      <View style={styles.form}>
        <Text style={styles.formHead}>Log in to see users</Text>
        <UILabel
          placeholder="Email"
          onChangeText={handleOnChangeEmail}
        />
        <UILabel
          placeholder="Password"
          onChangeText={handleOnChangePassword}
        />
        <UIButton
          disabled={!isFormValid || isLoading}
          onPress={handleOnClickLogin}
        >Log in</UIButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  form: {
    paddingTop: 100,
    gap: '10',
    width: '60%',
  },
  formHead: {
    fontSize: 20,
  },
});
