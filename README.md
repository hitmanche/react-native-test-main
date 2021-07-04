# Tasks
You are given 2 API endpoint `getPostById` and `getBatchUsersByIds`.
We have a really slow API, so it takes 3-10 seconds to respond per request.


------

You will fetch random posts from server and display them on `posts` component.
Displayed posts will change every time user presses the button.

---
Those post data have `userId` field. We also want to store all the users we come across in posts in the global context.
You can use `getBatchUsersByIds` function to request user information from server with user id array.

You can find types of users and posts in `models/apiModels.ts`

You can edit these 3 files:
 - [modules/posts.tsx](modules/posts.txs)
 - [modules/users.tsx](modules/users.tsx)
 - [App.tsx](App.tsx)

### modules/posts.tsx
**Info:**  `getNextPostIds()` function generates an array of post id's every time it is executed.

In posts component you will only show current posts that are received.
It will show loading on the button until all posts are received.
Posts will change every time we sent the request but we want keep users that we come across as writer of those posts in the global context `allUsers` field

 1 - Get posts by their id array from getNextPostIds() ex: [1,5,9]
 2 - Start loading indicator when request is sent and finish loading when all posts are loaded
 3 - Find out unique userIds from posts 
 4 - Request users from server with batch request
 5 - Add unique users to global context allUsers array, 

 ### modules/users.tsx
 **Info:** There are 2 components in this file, `Users` will show all the users saved in the context and `UserComponent` is used to render individual user in `FlatList`.

 `UserComponent` is using an expensive calculation on render, and we want you to optimize time wasted on `UserComponent`

 1 - Show all users saved in global context ordered by their ID
 2 - Delete user from global context when clicked on it
 3 - Optimize time wasted on `slowFunction`

 ### App.tsx
  Implement Redux like reducer logic for adding and deleting users.