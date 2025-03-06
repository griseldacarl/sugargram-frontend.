import Header from "../components/Header";
import Footer from "../components/Footer";
import StorySummary from "../components/StorySummary";
import PostList from "../components/PostList";
import { useFetchPostsQuery } from "../features/api/databaseApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MyStory = () => {
  const { id: userID } = useSelector((store) => store.currentUser);
  const { data: posts, isSuccess } = useFetchPostsQuery();
  let filteredPosts = [];

  filteredPosts = posts.filter((post) => post.userID == userID);

  return (
    <>
      <Header />
      <StorySummary postsCount={filteredPosts.length} />
      <PostList posts={filteredPosts} isOkToListPost={isSuccess} />
      <Footer />
    </>
  );
};

export default MyStory;
