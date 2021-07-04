import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getBatchUsersByIds, getPostById } from '../api';
import { useStateValue } from '../global/context';
import { getNextPostIds } from '../global/helper';
import { IPost, IUser } from '../models/apiModels';
function Posts({ navigation }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  const [state, dispatch] = useStateValue(); // Global Context

  const getAddUsers = async (userIds: number[]) => {
    try {
      const users = await getBatchUsersByIds(userIds);
      dispatch({
        type: 'user/add',
        users,
      });
    } catch (error) {
      console.error('Cannot fetch users:', userIds);
    }
  };

  const getPosts = async (postIds: number[]) => {
    var postListRequest = postIds.map((postId: number) => getPostById(postId));
    var resultPost = await Promise.all(postListRequest);
    if (Array.isArray(resultPost) && resultPost.length > 0) {
      const { allUsers } = state;
      const userIds: number[] = [];
      resultPost.forEach((post: IPost) => {
        const findUser = allUsers.find((user: IUser) => user.id === post.userId);
        if (!findUser && !userIds.find((id: number) => id === post.userId)) {
          userIds.push(post.userId);
        }
      });
      if (userIds.length > 0)
        await getAddUsers(userIds);

      setPosts(resultPost);
    }
  };

  const onPress = async () => {
    setIsLoading(true);
    const postIds = getNextPostIds();

    await getPosts(postIds);
    setIsLoading(false);
  };

  const renderItem = ({ item }: { item: IPost }) => (
    <>
      <View style={styles.container}>
        <Text style={styles.userStyle}>
          User ID: {item.userId}
        </Text>
        <View style={styles.titleStyle}>
          <Text style={styles.titleTextStyle}>
            {item.title}
          </Text>
        </View>
        <View style={styles.descStyle}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{ color: '#282F44' }}>
            {item.body.charAt(0).toUpperCase() + item.body.slice(1)}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: 'lightgray',
          marginTop: 20,
        }}
      />
    </>
  );

  return (
    <View style={{ marginHorizontal: 20 }}>
      <Button
        onPress={onPress}
        title={isLoading ? 'Loading...' : 'Load Next Posts'}
      />
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  userStyle: {
    fontWeight: 'bold',
    paddingRight: 10,
    paddingBottom: 10,
    color: 'black',
  },
  titleStyle: {
    flexDirection: 'row',
    paddingTop: 10,
    width: '100%',
  },
  titleTextStyle: {
    color: '#191D32',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  descStyle: { width: 250 },
  tinyLogo: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 50,
  },
});

export default Posts;
