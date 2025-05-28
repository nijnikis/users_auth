import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import validator from 'validator';
import { UIButton } from '../components/UI/UIButton';
import { UILabel } from '../components/UI/UILabel';
import { UILoader } from '../components/UI/UILoader';
import { useAuth } from '../context/AuthContext';


export default function Register() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const validateEmail = () => {
    if (!email) {
      setEmailError('');
      return;
    }
    setEmailError(validator.isEmail(email) ? '' : 'Wrong e-mail format');
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError('');
      return;
    }
    if (password.length < 4) {
      setPasswordError('Too short');
      return;
    }
    if (password.length > 11) {
      setPasswordError('Too long');
      return;
    }
    setPasswordError('');
  };

  useEffect(validateEmail, [email]);
  useEffect(validatePassword, [password]);
  useEffect(() => setIsFormValid(!!(!emailError && !passwordError && email && password)), [emailError, passwordError]);

  const handleOnClickRegister  = async () => {
    setIsLoading(true);
    const response  = await register!(email, password);

    if (!response) {
      alert('register no response');
    } else {
      if (response.error) {
        alert(response.message);
      } else {
        alert('User successfully registred');
      }
    }
    setIsLoading(false);
  };

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
        <Text style={styles.formHead}>Add new users</Text>
        <UILabel
          placeholder="Email"
          errorText={emailError}
          onChangeText={handleOnChangeEmail}
        />
        <UILabel
          placeholder="Password"
          errorText={passwordError}
          onChangeText={handleOnChangePassword}
        />
        <UIButton
          disabled={!isFormValid || isLoading}
          onPress={handleOnClickRegister}
        >Add</UIButton>
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
