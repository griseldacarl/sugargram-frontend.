import Story from "./Story";
import ListGroup from "react-bootstrap/ListGroup";

import { useFetchUsersQuery } from "../features/api/databaseApi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFetchFollwersQuery } from "../features/api/databaseApi";
const StoryList = () => {
  const { id: currentUserID } = useSelector((store) => store.currentUser);
  const { data: users, isSuccess: isSuccesUsers } = useFetchUsersQuery();
  const [imageUrl, setImageUrl] = useState(null);
  const default_image_path =
    window.location.origin + "/defaults/user-large-solid.png";

  const { data: followers, isSuccess: isSuccessFollowers } =
    useFetchFollwersQuery();
  let listOfPeopleYouAreFollowing = [];
  let filteredUsers = [];

  if (isSuccessFollowers) {
    listOfPeopleYouAreFollowing = followers.filter(
      (follower) => follower.follower == currentUserID
    );
  }

  if (isSuccesUsers && isSuccessFollowers) {
    listOfPeopleYouAreFollowing.map((follower) => {
      filteredUsers.push([
        ...users.filter((user) => user.userid == follower.followee),
        ...users.filter((user) => user.userid == currentUserID),
      ]);
    });
  }

  let displayStoriesForMe = [];
  if (isSuccesUsers && isSuccessFollowers && filteredUsers.length > 0) {
    displayStoriesForMe = filteredUsers[0].map((item, i) => (
      <ListGroup.Item key={item.userid} style={{ borderColor: "white" }}>
        <Story
          userDisplayName={item.displayName}
          userImage={
            item.image != ""
              ? `https://firebasestorage.googleapis.com/v0/b/diabeticvirtualassistant.firebasestorage.app/o/${item.image}?alt=media&token=92ee521f-75c3-469f-b1a1-949ddf7d351d`
              : default_image_path
          }
          userID={item.userid}
        />
      </ListGroup.Item>
    ));
  }

  return (
    <>
      <ListGroup className="overflow-auto" horizontal>
        {displayStoriesForMe}
      </ListGroup>
    </>
  );
};

export default StoryList;
