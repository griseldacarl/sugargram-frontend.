import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
export const databaseApi = createApi({
  reducerPath: "databaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Users", "Posts", "Stories", "Followers", "Likes"],
  endpoints: (builder) => ({
    fetchLikes: builder.query({
      async queryFn() {
        try {
          let likes = [];
          const querySnapshot = await getDocs(collection(db, "likes"));
          querySnapshot.forEach((doc) => {
            likes.push({ likesid: doc.id, ...doc.data() });
          });
          return { data: likes };
        } catch (e) {
          return e;
        }
      },
      invalidatesTags: ["Likes"],
    }),
    addLikes: builder.mutation({
      async queryFn(data) {
        try {
          await addDoc(collection(db, "likes"), {
            ...data,
          });
          return { data: data };
        } catch (e) {
          return e;
        }
      },
      invalidatesTags: ["Users"],
    }),
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
    updateUserImage: builder.mutation({
      async queryFn({ id, src }) {
        try {
          const userRef = doc(collection(db, "users"), id);
          await updateDoc(userRef, { image: src });
          return { data: src };
        } catch (e) {
          console.log(e);
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
    deletePost: builder.mutation({
      async queryFn(data) {
        try {
          await deleteDoc(doc(db, "posts", data.id));
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
    fetchFollwers: builder.query({
      async queryFn() {
        try {
          let followers = [];
          const querySnapshot = await getDocs(collection(db, "followers"));
          querySnapshot.forEach((doc) => {
            followers.push({ followersid: doc.id, ...doc.data() });
          });
          return { data: followers };
        } catch (e) {
          return e;
        }
      },
      invalidatesTags: ["Followers"],
    }),
    addFollowers: builder.mutation({
      async queryFn(data) {
        try {
          await addDoc(collection(db, "followers"), {
            ...data,
          });
          return { data: data };
        } catch (e) {
          return e;
        }
      },
      invalidatesTags: ["Followers"],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useAddPostMutation,
  useUpdateUserImageMutation,
  useFetchPostsQuery,
  useFetchStoriesQuery,
  useAddFollowersMutation,
  useFetchFollwersQuery,
  useDeletePostMutation,
  useAddLikesMutation,
  useFetchLikesQuery,
  middleware,
} = databaseApi;
export default databaseApi.reducer;
