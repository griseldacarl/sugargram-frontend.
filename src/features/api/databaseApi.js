import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
export const databaseApi = createApi({
  reducerPath: "databaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Users", "Posts", "Stories"],
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      async queryFn() {
        try {
          let users = [];
          const querySnapshot = await getDocs(collection(db, "users"));
          querySnapshot.forEach((doc) => {
            users.push({ userid: doc.id, ...doc.data() });
          });
          return { data: users };
        } catch (e) {
          return e;
        }
      },
      invalidatesTags: ["Users"],
    }),
    fetchPosts: builder.query({
      async queryFn() {
        try {
          let posts = [];
          const querySnapshot = await getDocs(collection(db, "posts"));
          querySnapshot.forEach((doc) => {
            posts.push({ postID: doc.id, ...doc.data() });
          });
          return { data: posts };
        } catch (e) {
          return e;
        }
      },
      invalidatesTags: ["Posts"],
    }),
    addPost: builder.mutation({
      async queryFn(data) {
        try {
          await addDoc(collection(db, `posts`), {
            ...data,
          });
          return { data: data };
        } catch (e) {
          return e;
        }
      },
      invalidatesTags: ["Posts"],
    }),

    fetchStories: builder.query({
      async queryFn() {
        try {
          let stories = [];
          const querySnapshot = await getDocs(collection(db, "stories"));
          querySnapshot.forEach((doc) => {
            stories.push({ storyid: doc.id, ...doc.data() });
          });
          return { data: stories };
        } catch (e) {
          return e;
        }
      },
      invalidatesTags: ["Stories"],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useAddPostMutation,
  useFetchPostsQuery,
  useFetchStoriesQuery,
  middleware,
} = databaseApi;
export default databaseApi.reducer;
