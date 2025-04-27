import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import {
  useAddFollowersMutation,
  useFetchFollwersQuery,
} from "../features/api/databaseApi";
import { useState, useEffect } from "react";
const User = ({
  userID,
  userDisplayName,
  userActivity,
  userAge,
  userEmail,
  userFirstName,
  userLastName,
  userHeight,
  userGender,
  userNotes,
  userImage,
}) => {
  const { id: currentUserID } = useSelector((store) => store.currentUser);
  const [AddFollowers] = useAddFollowersMutation();
  const [isOkToFollow, SetIsOkToFollow] = useState(false);
  const { data: followers, isSuccess: isFollowerSuccess } =
    useFetchFollwersQuery();

  const handleAddFollowers = async () => {
    if (userID === currentUserID) {
      console.log("You are not allowed to follow yourself!");
    } else {
      await AddFollowers({ follower: currentUserID, followee: userID });
    }
  };

  useEffect(() => {
    if (isFollowerSuccess) {
      SetIsOkToFollow(
        followers.filter(
          (follower) =>
            follower.follower == currentUserID && follower.followee == userID
        )
      );
    }
  }, [followers, currentUserID, userID, isFollowerSuccess]);

  return (
    <>
      <Card style={{ width: "15rem" }}>
        <Card.Img variant="top" src={userImage} />
        <Card.Body>
          <Card.Title>{userFirstName}</Card.Title>
          <Card.Text>
            {userDisplayName || "No Display Name Providered"} |{" "}
            {userAge || "No Age Available"} | {userEmail}
          </Card.Text>
          {isFollowerSuccess && isOkToFollow.length == 0 && (
            <Button onClick={handleAddFollowers} variant="dark">
              Follow
            </Button>
          )}
          {isFollowerSuccess && isOkToFollow.length > 0 && (
            <Button variant="secondary" disabled>
              Follow
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

User.prototype = {
  userID: PropTypes.string,
  userActivity: PropTypes.string,
  userAge: PropTypes.number,
  userEmail: PropTypes.string,
  userFirstName: PropTypes.string,
  userLastName: PropTypes.string,
  userHeight: PropTypes.string,
  userGender: PropTypes.string,
  userNotes: PropTypes.string,
  userImage: PropTypes.string,
};
export default User;
