import Header from "../components/Header";
import Footer from "../components/Footer";
import StoryList from "../components/StoryList";
import PostList from "../components/PostList";
import "../index.css";
import { useFetchPostsQuery } from "../features/api/databaseApi";

const Home = () => {
  const { data: posts, isSuccess } = useFetchPostsQuery();

  return (
    <>
      <Header />
      <StoryList />
      <PostList posts={posts} isOkToListPost={isSuccess} />
      <Footer />
    </>
  );
};

export default Home;
