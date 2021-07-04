import React, { useCallback } from 'react';
import {
  FlatList,
  View,
} from 'react-native';
import { useStateValue } from '../global/context';
import { IPost, IUser } from '../models/apiModels';
import UserComponent from './userDetail';

function Users() {

  const [{ allUsers }, dispatch] = useStateValue();

  const orderedUsers: IUser[] = [...allUsers];

  const deleteUser = useCallback((user: IUser) => {
    dispatch({
      type: 'user/delete',
      user,
    });
  }, []);

  return (
    < View >
      <FlatList
        data={orderedUsers.sort((a: IUser, b: IUser) => a.id - b.id)}
        renderItem={({ item }) => <UserComponent user={item} onClick={deleteUser} />}
        keyExtractor={item => item.id.toString()}
      />
    </View >
  );
}

const arePropsEqual = (prevProps: any, nextProps: any) => {
  return nextProps?.allUsers?.length === prevProps?.allUsers?.length
}

export default React.memo(Users, arePropsEqual);


