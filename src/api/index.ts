/**
 * https://jsonplaceholder.typicode.com/posts?userId[]=1&userId[]=2
*/

const BASE_API_URL = 'https://jsonplaceholder.typicode.com'

import axios from 'axios';
import { delay } from '../global/helper';
import { IPost, IUser } from '../models/apiModels';

export const APIClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  // params: {
  //   _delay: 3000
  // }
});

/**
 * Returns user information for given id's
 * @param userIds array of user id's
 */
export async function getBatchUsersByIds(userIds: number[]) {
  const params = {
    id: userIds,
  }

  const { data } = await APIClient.get<IUser[]>('/users', { params });

  // Map users to retain duplicates
  const result = userIds.map( userID => data.find( user => user.id == userID))

  await delay(3000);

  return result;
}

/**
 * Returns all the posts written by given user
 * @param userId 
 */
export async function getUserPosts(userId: number) {

  const params = {
    userId,
  }

  await delay(3000);

  const { data } = await APIClient.get<IPost[]>('/posts', { params });

  return data;
}

/**
 * Returns post data for given id
 * @param postID post id
 */
export async function getPostById(postID: number) {
  await delay(10000);

  const { data } = await APIClient.get<IPost>(`/posts/${postID}`);

  return data;
}