import { useAuth } from '../context/AuthContext';
import { Login } from '../components/Login';
import { Users } from '../components/Users';

export default function HomeScreen() {
  const { authState } = useAuth();
  return authState?.authenticated ? <Users/> : <Login/>;
};
