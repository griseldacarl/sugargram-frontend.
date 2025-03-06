import React, { useRef, useEffect, useState } from "react";
import uuid from "react-uuid";
import {
  Button,
  Form,
  Card,
  Image,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { FaCameraRetro } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  useAddPostMutation,
  useFetchPostsQuery,
} from "../features/api/databaseApi";

const PostCapture = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(1); // Default aspect ratio
  const imageContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [comments, setComments] = useState("");
  const [step, setStep] = useState(1);

  const [AddPost] = useAddPostMutation();
  const { refetch } = useFetchPostsQuery();

  const {
    name: currentUserName,
    email: currentUserEmail,
    id: currentUserID,
  } = useSelector((store) => store.currentUser);

  useEffect(() => {
    const calculateAspectRatio = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      setAspectRatio(screenWidth / screenHeight);
    };

    calculateAspectRatio(); // Initial calculation
    window.addEventListener("resize", calculateAspectRatio); // Recalculate on resize

    return () => {
      window.removeEventListener("resize", calculateAspectRatio);
    };
  }, []);

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

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const finish = async () => {
    alert(`Image captured and comments added: ${comments}`);
    let newPost = {};
    let uniqueID = uuid();
    newPost.postImage = `posts%2Fpost-image-${uniqueID}.jpg`;
    newPost.postVideo = "";
    newPost.isPostImage = true;
    newPost.userID = currentUserID;
    newPost.userDisplayName = currentUserName;
    newPost.userMessage = comments;

    await AddPost(newPost);
    // Here you would typically send the image and comments to a server
    const storageRef = ref(storage, `posts/post-image-${uniqueID}.jpg`);
    const response = await fetch(imageSrc);
    const blob = await response.blob();
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    refetch();
    setStep(1);
    setImageSrc(null);
    setComments("");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Capture Image</Form.Label>
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
                <FaCameraRetro /> &nbsp;Share Your Diabetic Post!
              </Button>
            </Form.Group>
            {imageSrc && (
              <div
                ref={imageContainerRef}
                className="mt-3"
                style={{
                  position: "relative",
                  //  paddingBottom: `${100 / aspectRatio}%`, // Maintain aspect ratio
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <Image src={imageSrc} alt="Captured" fluid rounded />
              </div>
            )}
            <div className="mt-3">
              <Button variant="dark" onClick={nextStep} disabled={!imageSrc}>
                Next
              </Button>
            </div>
          </Card.Body>
        );
      case 2:
        return (
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Add Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </Form.Group>
            <div className="mt-3">
              <Button variant="dark" onClick={prevStep}>
                Previous
              </Button>
              <Button variant="dark" onClick={nextStep} disabled={!comments}>
                Next
              </Button>
            </div>
          </Card.Body>
        );
      case 3:
        return (
          <Card.Body>
            <p>Review and Finish</p>
            {imageSrc && (
              <div className="mt-3">
                <Image
                  src={imageSrc}
                  alt="Captured"
                  style={{
                    position: "relative",
                    top: 10,
                    left: 0,
                    width: "80%",
                    height: "80%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
            <p className="mt-3">Comments: {comments}</p>
            <div className="mt-3">
              <Button variant="dark" onClick={prevStep}>
                Previous
              </Button>
              <Button variant="dark" onClick={finish}>
                Finish
              </Button>
            </div>
          </Card.Body>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Header>
                <nav>
                  <a
                    href="#step1"
                    className={step === 1 ? "active" : ""}
                    onClick={() => setStep(1)}
                    style={{ marginRight: "10px", textDecoration: "none" }}
                  >
                    Take a Pic
                  </a>
                  <a
                    href="#step2"
                    className={step === 2 ? "active" : ""}
                    onClick={() => setStep(2)}
                    style={{ marginRight: "10px", textDecoration: "none" }}
                  >
                    Add a Comment
                  </a>
                  <a
                    href="#step3"
                    className={step === 3 ? "active" : ""}
                    onClick={() => setStep(3)}
                    style={{ textDecoration: "none" }}
                  >
                    Save a Post
                  </a>
                </nav>
              </Card.Header>
              {renderStep()}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PostCapture;
