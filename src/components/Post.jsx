import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { Player, PosterImage } from "video-react";
import { SlOptions } from "react-icons/sl";
import { ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { TbLocationShare } from "react-icons/tb";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";
import {
  useDeletePostMutation,
  useFetchPostsQuery,
  useFetchLikesQuery,
  useAddLikesMutation,
} from "../features/api/databaseApi";

const Post = ({
  postImage,
  postVideo,
  isPostImage,
  postID,
  userID,
  userMessage,
  userDisplayName,
  displayOptions,
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [DeletePost] = useDeletePostMutation();
  const { refetch: refetchPosts } = useFetchPostsQuery();
  const {
    data: likes,
    isSuccess: isLikesSuccess,
    refetch: refetchLikes,
  } = useFetchLikesQuery();
  const [AddLikes] = useAddLikesMutation();
  const { id: currentUserID } = useSelector((store) => store.currentUser);

  const [numberOfLikesForThisPost, setNumberOfLikesForThisPost] = useState(0);

  useEffect(() => {
    if (!postImage.includes("user-large-solid")) {
      setImageUrl(
        `https://firebasestorage.googleapis.com/v0/b/diabeticvirtualassistant.firebasestorage.app/o/${postImage}?alt=media&token=92ee521f-75c3-469f-b1a1-949ddf7d351d`
      );
      //console.log(`${postImage} => : ${imageUrl}`);
    }
  }, [imageUrl]);
  useEffect(() => {
    if (isLikesSuccess) {
      setNumberOfLikesForThisPost(
        likes.filter((like) => like.postToLike == postID).length
      );
    }
  }, [likes, numberOfLikesForThisPost]);
  const handleDelete = async () => {
    await DeletePost({ id: postID });
    refetchPosts();
  };

  const handleAddLike = async () => {
    await AddLikes({
      postToLike: postID,
      userWhoPostedthePost: userID,
      userWhoLikedPost: currentUserID,
    });
    refetchLikes();
  };
  return (
    <>
      <Card style={{ width: "100%", borderColor: "white" }}>
        <Card.Header style={{ borderColor: "white" }}>
          <Container fluid>
            <Row>
              <Col>{userDisplayName}</Col>
              <Col>
                {" "}
                <span className="d-flex justify-content-end">
                  {displayOptions && (
                    <Dropdown>
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <SlOptions />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={handleDelete}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </span>
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body className="justify-content-center align-items-center">
          {isPostImage && (
            <Card.Img style={{ width: "100%" }} variant="top" src={imageUrl} />
          )}
          {!isPostImage && (
            <Player playsInline poster={postImage} src={postVideo} />
          )}
          <ButtonGroup aria-label="Basic example">
            {!displayOptions && isLikesSuccess && (
              <Button variant="light">
                <CiHeart />
                <Badge onClick={handleAddLike} bg="dark">
                  {numberOfLikesForThisPost}
                </Badge>
              </Button>
            )}
            {displayOptions && isLikesSuccess && (
              <Button variant="light" disabled>
                <CiHeart />
                <Badge bg="secondary">{numberOfLikesForThisPost}</Badge>
              </Button>
            )}
          </ButtonGroup>
          <blockquote className="blockquote mb-0">
            <p>{userMessage}</p>
            <footer className="blockquote-footer">
              Posted by <cite title="Source Title">{userDisplayName}</cite>
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    </>
  );
};

Post.propTypes = {
  postImage: PropTypes.string,
  postVideo: PropTypes.string,
  postID: PropTypes.string,
  userID: PropTypes.string,
  userMessage: PropTypes.string,
  isPostImage: PropTypes.bool,
  userDisplayName: PropTypes.string,
};
export default Post;
