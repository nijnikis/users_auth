import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { IUser, useAuth } from '../context/AuthContext';
import { UIButton } from './UI/UIButton';
import { UILoader } from './UI/UILoader';


export const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { usersState, logout, getUsers } = useAuth();

  const handleOnClickReload  = async () => {
    setIsLoading(true);
    const response  = await getUsers!();
    if (!response) {
      alert('getUsers no response');
    } else {
      if (response.error) {
        alert(response.message);
      } else {
        alert('Here they are!');
      }
    }
    setIsLoading(false);
  };

  const handleOnClickLogout  = async () => {
    setIsLoading(true);
    const response  = await logout!();
    if (!response) {
      alert('Logout no response');
    } else {
      if (response.error) {
        alert(response.message);
      } else {
        alert(response.message);
      }
    }
    setIsLoading(false);
  };

  const renderItem = ({item}: {item: IUser}) => <Text style={styles.usersItem}>{item.email}</Text>;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <UILoader isLoading={isLoading} />
        <View style={styles.users}>
          <View style={styles.usersHeader}>
            <UIButton
              disabled={isLoading}
              onPress={handleOnClickReload}
            >Reload</UIButton>
            <UIButton
              disabled={isLoading}
              onPress={handleOnClickLogout}
            >Log out</UIButton>
          </View>
          <View style={styles.usersHead}>
            <View style={styles.usersHeadContainer}>
              <Text style={styles.usersHeadText}>Users:</Text>
              <View style={styles.usersHeadImg}></View>
            </View>
          </View>
          <FlatList
            style={styles.usersList}
            data={usersState}
            renderItem={renderItem}
            keyExtractor={user => user.id}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  users: {
    padding: 20,
  },
  usersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  usersHead: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  usersHeadContainer: {
    position: 'relative',
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    backgroundColor: '#ff9edf',
  },
  usersHeadText: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  usersHeadImg: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderWidth: 10,
    borderRightColor: 'transparent',
    borderBottomColor: '#ff9edf',
    borderLeftColor: '#ff9edf',
    borderTopColor: 'transparent',
    transform: 'translate(100%, 0), translate(-1px, 0)',
  },
  usersListContainer: {},
  usersList: {},
  usersItem: {
    padding: 10,
  },
});
