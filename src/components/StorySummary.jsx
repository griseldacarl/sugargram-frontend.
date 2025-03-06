import ListGroup from "react-bootstrap/ListGroup";
import Story from "./Story";
import UserStatistics from "./UserStatistics";

const StorySummary = ({ postsCount }) => {
  const postsForMeCount = 100;
  const followersOfMeCount = 1000;
  const followingByMeCount = 500;
  const default_image_path =
    window.location.origin + "/defaults/user-large-solid.png";

  const currentUser = {
    storyid: "111111",
    userImage: default_image_path,
    userDisplayName: "Carl Mitchell",
    userid: "111111",
  };

  return (
    <>
      <ListGroup horizontal>
        <ListGroup.Item style={{ borderColor: "white" }}>
          <Story
            storyID={currentUser.storyid}
            userImage={currentUser.userImage}
            userDisplayName={currentUser.userDisplayName}
            userID={currentUser.userid}
          />
        </ListGroup.Item>
        <ListGroup.Item style={{ borderColor: "white" }}>
          <UserStatistics
            postsCount={postsCount}
            followersCount={followersOfMeCount}
            followingCount={followingByMeCount}
          />
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default StorySummary;
