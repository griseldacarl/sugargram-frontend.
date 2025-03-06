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

const Post = ({
  postImage,
  postVideo,
  isPostImage,
  postID,
  userID,
  userMessage,
  userDisplayName,
}) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!postImage.includes("user-large-solid")) {
      setImageUrl(
        `https://firebasestorage.googleapis.com/v0/b/diabeticvirtualassistant.firebasestorage.app/o/${postImage}?alt=media&token=92ee521f-75c3-469f-b1a1-949ddf7d351d`
      );
      //console.log(`${postImage} => : ${imageUrl}`);
    }
  }, [imageUrl]);

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
                  <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                      <SlOptions />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
            <Button variant="light">
              <CiHeart />
              <Badge bg="dark">9</Badge>
            </Button>
            <Button variant="light">
              <FaRegComment />
              <Badge bg="dark">9</Badge>
            </Button>
            <Button variant="light">
              <TbLocationShare />
              <Badge bg="dark">9</Badge>
            </Button>
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
