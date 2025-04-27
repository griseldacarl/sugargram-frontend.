import ListGroup from "react-bootstrap/ListGroup";
import Story from "./Story";
import UserStatistics from "./UserStatistics";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaCameraRetro } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import uuid from "react-uuid";
import {
  useUpdateUserImageMutation,
  useFetchFollwersQuery,
} from "../features/api/databaseApi";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

const StorySummary = ({ postsCount }) => {
  const { id: currentUserID } = useSelector((store) => store.currentUser);
  const { data: followers, isSuccess: isFollowerSuccess } =
    useFetchFollwersQuery();

  const [followersOfMeCount, setFollowersOfMeCount] = useState(0);
  const [followingByMeCount, setFollowersByMeCount] = useState(0);

  const inputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [UpdateUserImage] = useUpdateUserImageMutation();
  const {
    id: userID,
    email,
    image: userImagePic,
    displayName,
  } = useSelector((store) => store.currentUser);
  const default_image_path =
    window.location.origin + "/defaults/user-large-solid.png";

  useEffect(() => {
    if (isFollowerSuccess) {
      setFollowersByMeCount(
        followers.filter((follower) => follower.follower == currentUserID)
          .length
      );
    }
  }, [followingByMeCount]);

  useEffect(() => {
    if (isFollowerSuccess) {
      setFollowersOfMeCount(
        followers.filter((follower) => follower.followee == currentUserID)
          .length
      );
    }
  }, [followersOfMeCount]);

  useEffect(() => {
    if (userImagePic != "") {
      setImageUrl(
        `https://firebasestorage.googleapis.com/v0/b/diabeticvirtualassistant.firebasestorage.app/o/${userImagePic}?alt=media&token=92ee521f-75c3-469f-b1a1-949ddf7d351d`
      );
    } else {
      setImageUrl(default_image_path);
    }
  }, [imageUrl]);

  const currentImage = imageUrl;

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    await UpdateUserImage({
      id: userID,
      src: `profiles%2Fprofile-image-${userID}.jpg`,
    });

    const storageRef = ref(storage, `profiles/profile-image-${userID}.jpg`);
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  return (
    <>
      <ListGroup horizontal>
        <ListGroup.Item style={{ borderColor: "white" }}>
          <Story
            storyID={userID}
            userImage={imageSrc || currentImage}
            userDisplayName={displayName}
            userID={userID}
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
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Settings</Accordion.Header>
          <Accordion.Body>
            <Form.Group className="mb-3">
              <Form.Label>Edit Profile Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                capture="user"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleCapture}
              />
              <Button
                variant="dark"
                className="d-flex justify-content-center align-items-center "
                onClick={() => inputRef.current.click()}
              >
                <FaCameraRetro /> &nbsp;
              </Button>
              <Button onClick={handleSave} variant="dark">
                Save Changes
              </Button>
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default StorySummary;
