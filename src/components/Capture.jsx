import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import CloseButton from "react-bootstrap/CloseButton";
import { useNavigate } from "react-router-dom";
import PostCapture from "./PostCapture";
import StoryCapture from "./StoryCapture";
import { useState } from "react";
const Capture = () => {
  const navigate = useNavigate();

  let [showPost, setShowPost] = useState(true);

  const handlShowPostClick = (postStatus) => {
    setShowPost(postStatus);
  };

  const handlClick = () => {
    navigate("/");
  };
  return (
    <>
      <CloseButton className="fixed-top" onClick={handlClick} />
      {showPost && <PostCapture />}
      {!showPost && <StoryCapture />}
      <ButtonGroup aria-label="Basic example" className="fixed-bottom bg-light">
        <Button variant="secondary" onClick={() => handlShowPostClick(true)}>
          Post
        </Button>

        <Button variant="secondary" onClick={() => handlShowPostClick(false)}>
          Story
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Capture;
