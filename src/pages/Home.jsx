import Header from "../components/Header";
import Footer from "../components/Footer";
import StoryList from "../components/StoryList";
import PostList from "../components/PostList";
import "../index.css";
import {
  useFetchFollwersQuery,
  useFetchPostsQuery,
} from "../features/api/databaseApi";
import { useSelector } from "react-redux";

const Home = () => {
  const { data: posts, isSuccess } = useFetchPostsQuery();
  const { id: userID } = useSelector((store) => store.currentUser);
  const { data: followers, isSuccess: isSuccessFollowers } =
    useFetchFollwersQuery();
  let filteredPosts = [];
  let listOfPeopleYouAreFollowing = [];
  if (isSuccessFollowers) {
    listOfPeopleYouAreFollowing = followers.filter(
      (follower) => follower.follower == userID
    );
  }
  if (isSuccess && isSuccessFollowers) {
    listOfPeopleYouAreFollowing.map((follower) => {
      filteredPosts.push([
        ...posts.filter((post) => post.userID == follower.followee),
        ...posts.filter((post) => post.userID == userID),
      ]);
    });
  }

  return (
    <>
      <Header />
      <StoryList />
      <PostList
        posts={filteredPosts[0]}
        isOkToListPost={isSuccess}
        isOkToSeePostOptions={false}
      />
      <Footer />
    </>
  );
};

export default Home;
